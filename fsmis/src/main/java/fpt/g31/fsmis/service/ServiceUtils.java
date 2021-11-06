package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.AddressFromWardDtoOut;
import fpt.g31.fsmis.entity.address.Ward;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

public class ServiceUtils {

    private static final String OUTPUT_DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
    private static final String INPUT_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

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

    public static String getAddress(String address, Ward ward) {
        return address + ", "
                + ward.getName() + ", "
                + ward.getDistrict().getName() + ", "
                + ward.getDistrict().getProvince().getName();
    }

    public static String convertDateToString(LocalDateTime date) {
        return date.format(DateTimeFormatter.ofPattern(OUTPUT_DATE_FORMAT));
    }

    public static LocalDateTime convertStringToDate(String date) {
        return LocalDateTime.parse(date, DateTimeFormatter.ofPattern(INPUT_DATE_FORMAT));
    }

    public static List<String> splitString(String input) {
        String[] output = input.split("\r\n");
        return Arrays.asList(output);
    }

    public static String mergeString(List<String> input){
        StringBuilder sbd = new StringBuilder();
        for (String s :
                input) {
            sbd.append(s).append("\r\n");
        }
        return sbd.toString();
    }
}