package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.address.District;
import fpt.g31.fsmis.entity.address.Province;
import fpt.g31.fsmis.entity.address.Ward;
import fpt.g31.fsmis.repository.DistrictRepos;
import fpt.g31.fsmis.repository.ProvinceRepos;
import fpt.g31.fsmis.repository.WardRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
}