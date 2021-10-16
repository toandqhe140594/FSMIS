package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.AddressFromWardDtoOut;
import fpt.g31.fsmis.entity.address.Ward;

public class ServiceUtils {

    private ServiceUtils(){
        throw new IllegalStateException("Utility class");
    }

    static AddressFromWardDtoOut getAddressByWard(Ward ward){
        AddressFromWardDtoOut result = new AddressFromWardDtoOut();
        result.setWard(ward.getName());
        result.setWardId(ward.getId());
        result.setDistrict(ward.getDistrict().getName());
        result.setDistrictId(ward.getDistrict().getId());
        result.setProvince(ward.getDistrict().getProvince().getName());
        result.setProvinceId(ward.getDistrict().getProvince().getId());
        return result;
    }
}
