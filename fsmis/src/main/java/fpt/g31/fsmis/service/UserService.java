package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ChangePasswordDtoIn;
import fpt.g31.fsmis.dto.input.PersonalInfoDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.repository.*;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepos userRepos;
    private final CatchesRepos catchesRepos;
    private final ReviewRepos reviewRepos;
    private final CheckInRepos checkInRepos;
    private final WardRepos wardRepos;
    private final ModelMapper modelMapper;
    private final JwtFilter jwtFilter;
    private final PasswordEncoder passwordEncoder;

    public PersonalInfoDtoOut getPersonalInformation(HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        PersonalInfoDtoOut personalInformationDtoOut =
                modelMapper.map(user, PersonalInfoDtoOut.class);
        personalInformationDtoOut.setAddressFromWard(ServiceUtils.getAddressByWard(user.getWard()));
        return personalInformationDtoOut;
    }

    public String savePersonalInformation(HttpServletRequest request, PersonalInfoDtoIn personalInfoDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        user.setAvatarUrl(personalInfoDtoIn.getAvatarUrl());
        user.setFullName(personalInfoDtoIn.getFullName());
        user.setDob(ServiceUtils.convertStringToDate(personalInfoDtoIn.getDob()));
        user.setGender(personalInfoDtoIn.getGender());
        user.setAddress(personalInfoDtoIn.getAddress());
        user.setWard(wardRepos.getById(personalInfoDtoIn.getWardId()));
        userRepos.save(user);
        return "Thay đổi thông tin thành công";
    }

    public String changePassword(HttpServletRequest request, ChangePasswordDtoIn changePasswordDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        if (!passwordEncoder.matches(changePasswordDtoIn.getOldPassword(), user.getPassword())) {
            throw new ValidationException("Mật khẩu không đúng");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDtoIn.getNewPassword()));
        userRepos.save(user);
        return "Thay đổi mật khẩu thành công";
    }

    public String changePhone(HttpServletRequest request, String newPhone) {
        User user = jwtFilter.getUserFromToken(request);
        user.setPhone(newPhone);
        userRepos.save(user);
        return "Thay đổi số điện thoại thành công";
    }

    public PaginationDtoOut getPersonalCatchList(HttpServletRequest request, int pageNo) {
        if(pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);
        Page<Catches> catches = catchesRepos.findByUserId(user.getId(), PageRequest.of(pageNo - 1, 10));
        List<CatchesOverviewNoImageDtoOut> catchesOverviewDtoOut = new ArrayList<>();
        for (Catches catchItem : catches) {
            CatchesOverviewNoImageDtoOut item = CatchesOverviewNoImageDtoOut.builder()
                    .userId(user.getId())
                    .userFullName(user.getFullName())
                    .avatar(user.getAvatarUrl())
                    .locationId(catchItem.getFishingLocation().getId())
                    .locationName(catchItem.getFishingLocation().getName())
                    .catchId(catchItem.getId())
                    .description(catchItem.getDescription())
                    .images(ServiceUtils.splitString(catchItem.getImageUrl()))
                    .time(ServiceUtils.convertDateToString(catchItem.getTime()))
                    .build();
            catchesOverviewDtoOut.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(catches.getTotalPages())
                .pageNo(pageNo)
                .items(catchesOverviewDtoOut)
                .build();
    }

    public CatchesDetailDtoOut getPersonalCatchDetails(HttpServletRequest request, Long catchesId) {
        User user = jwtFilter.getUserFromToken(request);
        Catches catches = catchesRepos.getById(catchesId);
        List<CatchesDetail> catchesDetails = catches.getCatchesDetailList();
        List<CatchesFishDtoOut> catchesFishDtoOutList = new ArrayList<>();
        for (CatchesDetail item : catchesDetails) {
            CatchesFishDtoOut build = CatchesFishDtoOut.builder()
                    .name(item.getFishSpecies().getName())
                    .image(item.getFishSpecies().getImageUrl())
                    .quantity(item.getQuantity())
                    .weight(item.getWeight())
                    .build();
            catchesFishDtoOutList.add(build);
        }

        CatchesDetailDtoOut output = CatchesDetailDtoOut.builder()
                .userId(user.getId())
                .userFullName(user.getFullName())
                .avatar(user.getAvatarUrl())
                .locationId(catches.getFishingLocation().getId())
                .locationName(catches.getFishingLocation().getName())
                .catchId(catches.getId())
                .description(catches.getDescription())
                .images(ServiceUtils.splitString(catches.getImageUrl()))
                .time(ServiceUtils.convertDateToString(catches.getTime()))
                .fishes(catchesFishDtoOutList)
                .build();
        return output;
    }

    public PaginationDtoOut getSavedFishingLocation(HttpServletRequest request, int pageNo) {
        if(pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);

        // CUSTOM PAGINATION
        List<FishingLocation> saved = user.getSavedFishingLocations();
        PageRequest pageRequest = PageRequest.of(pageNo - 1, 10);
        int total = saved.size();
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), total);
        Page<FishingLocation> savedFishingLocations = new PageImpl<>(saved.subList(start, end), pageRequest, total);

        List<FishingLocationItemDtoOut> output = new ArrayList<>();
        for (FishingLocation fishingLocation : savedFishingLocations) {
            FishingLocationItemDtoOut item = FishingLocationItemDtoOut.builder()
                    .id(fishingLocation.getId())
                    .name(fishingLocation.getName())
                    .image(ServiceUtils.splitString(fishingLocation.getImageUrl()).get(0))
                    .verify(fishingLocation.getVerify())
                    .score(reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(fishingLocation.getId()))
                    .address(ServiceUtils.getAddress(fishingLocation.getAddress(), fishingLocation.getWard()))
                    .build();
            output.add(item);
        }

        return PaginationDtoOut.builder()
                .totalPage(savedFishingLocations.getTotalPages())
                .pageNo(pageNo)
                .items(output)
                .build();
    }

    public PaginationDtoOut getCheckInHistory(HttpServletRequest request, int pageNo) {
        if(pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);
        Page<CheckIn> checkInList = checkInRepos.findByUserIdOrderByCheckInTimeDesc(user.getId(), PageRequest.of(pageNo-1, 10));
        List<CheckInHistoryPersonalDtoOut> output = new ArrayList<>();
        for (CheckIn checkIn : checkInList) {
            CheckInHistoryPersonalDtoOut item = CheckInHistoryPersonalDtoOut.builder()
                    .id(checkIn.getId())
                    .locationId(checkIn.getFishingLocation().getId())
                    .locationName(checkIn.getFishingLocation().getName())
                    .checkInTime(ServiceUtils.convertDateToString(checkIn.getCheckInTime()))
                    .checkOutTime(checkIn.getCheckOutTime() == null
                            ? "Bạn chưa check-out"
                            : ServiceUtils.convertDateToString(checkIn.getCheckOutTime()))
                    .build();
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(checkInList.getTotalPages())
                .pageNo(pageNo)
                .items(output)
                .build();
    }
}
