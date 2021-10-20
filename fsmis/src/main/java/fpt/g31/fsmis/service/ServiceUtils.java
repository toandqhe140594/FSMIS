package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.AddressFromWardDtoOut;
import fpt.g31.fsmis.entity.address.Ward;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

public class ServiceUtils {

    private static final String DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";

    private ServiceUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static AddressFromWardDtoOut getAddressByWard(Ward ward) {
        AddressFromWardDtoOut result = new AddressFromWardDtoOut();
        result.setWard(ward.getName());
        result.setWardId(ward.getId());
        result.setDistrict(ward.getDistrict().getName());
        result.setDistrictId(ward.getDistrict().getId());
        result.setProvince(ward.getDistrict().getProvince().getName());
        result.setProvinceId(ward.getDistrict().getProvince().getId());
        return result;
    }

    public static String convertDateToString(LocalDateTime date) {
        return date.format(DateTimeFormatter.ofPattern(DATE_FORMAT));
    }

    public static LocalDateTime convertStringToDate(String date) {
        return LocalDateTime.parse(date, DateTimeFormatter.ofPattern(DATE_FORMAT));
    }

    public static List<String> splitString(String input) {
        String[] output = input.split("\r\n\r\n");
        return Arrays.asList(output);
    }
}