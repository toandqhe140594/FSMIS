package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.DistrictDtoOut;
import fpt.g31.fsmis.dto.output.ProvinceDtoOut;
import fpt.g31.fsmis.dto.output.WardDtoOut;
import fpt.g31.fsmis.entity.address.District;
import fpt.g31.fsmis.entity.address.Province;
import fpt.g31.fsmis.entity.address.Ward;
import fpt.g31.fsmis.repository.DistrictRepos;
import fpt.g31.fsmis.repository.ProvinceRepos;
import fpt.g31.fsmis.repository.WardRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AddressService {
    private DistrictRepos districtRepos;
    private ProvinceRepos provinceRepos;
    private WardRepos wardRepos;

    public List<Province> getAllProvince() {
        return provinceRepos.findAll();
    }

    public List<District> getDistrictByProvinceId(Long provinceId) {
        return districtRepos.findByProvinceId(provinceId);
    }

    public List<Ward> getWardByDistrictId(Long districtId) {
        return wardRepos.findByDistrictId(districtId);
    }

    public List<ProvinceDtoOut> getAll() {
        List<ProvinceDtoOut> provinceDtoOutList = new ArrayList<>();
        List<Province> provinceList = provinceRepos.findAll();
        for (Province province: provinceList) {
            List<DistrictDtoOut> districtDtoOutList = new ArrayList<>();
            List<District> districtList = districtRepos.findByProvinceId(province.getId());
            for (District district: districtList) {
                List<WardDtoOut> wardDtoOutList = new ArrayList<>();
                List<Ward> wardList = wardRepos.findByDistrictId(district.getId());
                for (Ward ward: wardList) {
                    wardDtoOutList.add(WardDtoOut.builder().id(ward.getId()).name(ward.getName()).build());
                }
                districtDtoOutList.add(DistrictDtoOut.builder().id(district.getId()).name(district.getName()).wardDtoOutList(wardDtoOutList).build());
            }
            provinceDtoOutList.add(ProvinceDtoOut.builder().id(province.getId()).name(province.getName()).districtDtoOutList(districtDtoOutList).build());
        }
        return provinceDtoOutList;
    }
}
