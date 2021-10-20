package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.UserDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.Catches;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.UserNotFoundException;
import fpt.g31.fsmis.repository.CatchesRepos;
import fpt.g31.fsmis.repository.UserRepos;
import fpt.g31.fsmis.security.JwtFilter;
import fpt.g31.fsmis.security.JwtProvider;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepos userRepos;
    private final CatchesRepos catchesRepos;
    private final ModelMapper modelMapper;
    private final JwtProvider jwtProvider;
    private final JwtFilter jwtFilter;

    public PersonalInformationDtoOut getPersonalInformation(HttpServletRequest request) {
        User user = getUserFromToken(request);
        PersonalInformationDtoOut personalInformationDtoOut =
                modelMapper.map(user, PersonalInformationDtoOut.class);
        personalInformationDtoOut.setAddressFromWard(ServiceUtils.getAddressByWard(user.getWard()));
        return personalInformationDtoOut;
    }

    public List<CatchesOverviewDtoOut> getPersonalCatchList(HttpServletRequest request) {
        User user = getUserFromToken(request);
        List<Catches> catches = catchesRepos.findByUserId(user.getId());
        List<CatchesOverviewDtoOut> catchesOverviewDtoOut = new ArrayList<>();
        for(Catches catchItem : catches) {
            CatchesOverviewDtoOut item = CatchesOverviewDtoOut.builder()
                    .id(catchItem.getId())
                    .description(catchItem.getDescription())
                    .images(ServiceUtils.splitString(catchItem.getImageUrl()))
                    .time(ServiceUtils.convertDateToString(catchItem.getTime()))
                    .fishingLocation(FishingLocationIdNameDtoOut.builder()
                            .id(catchItem.getFishingLocation().getId())
                            .name(catchItem.getFishingLocation().getName())
                            .build())
                    .build();
            catchesOverviewDtoOut.add(item);
        }
        return catchesOverviewDtoOut;
    }

    public CatchDetailsDtoOut getPersonalCatchDetails(HttpServletRequest request, Long catchId) {
        User user = getUserFromToken(request);
        Catches catches = catchesRepos.getById(catchId);

//        List<>
//
//        CatchDetailsDtoOut.builder()
//                .id(catches.getId())
//                .description(catches.getDescription())
//                .images(ServiceUtils.splitString(catches.getImageUrl()))
//                .time(ServiceUtils.convertDateToString(catches.getTime()))
//                .fishingLocation(FishingLocationIdNameDtoOut.builder()
//                        .id(catches.getFishingLocation().getId())
//                        .name(catches.getFishingLocation().getName())
//                        .build())
//                .
//                .build();
        return null;
    }

    public List<User> getAllUsers() {
        return userRepos.findAll();
    }

    public User updateUser(UserDtoIn userDtoIn, long userId) {
        Optional<User> userOptionalById = userRepos.findById(userId);
        if (userOptionalById.isPresent()) {
            User user = userOptionalById.get();
            User newUser = modelMapper.map(userDtoIn, User.class);
            modelMapper.map(newUser, user);
            return userRepos.save(user);
        } else {
            throw new UserNotFoundException(userId);
        }
    }

    public UserDtoOut getUserById(long id) {
        Optional<User> userOptional = userRepos.findById(id);
        UserDtoOut userDtoOut;
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userDtoOut = modelMapper.map(user, UserDtoOut.class);
            userDtoOut.setAddressFromWard(ServiceUtils.getAddressByWard(user.getWard()));
            return userDtoOut;
        } else {
            throw new UserNotFoundException(id);
        }
    }

    private User getUserFromToken(HttpServletRequest request) {
        String phone = jwtProvider.getPhoneFromJwtToken(jwtFilter.getJwtTokenFromRequest(request));
        User user = userRepos.findByPhone(phone);
        if (user == null) {
            throw new ValidationException("Người dùng không tồn tại");
        }
        return user;
    }
}
