package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.entity.District;
import fpt.g31.fsmis.entity.Province;
import fpt.g31.fsmis.entity.Ward;
import fpt.g31.fsmis.service.AddressService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/address")
public class AddressController {
    private AddressService addressService;

    @GetMapping(path = "/province")
    public ResponseEntity<List<Province>> getAllProvince() {
        return new ResponseEntity<>(addressService.getAllProvince(), HttpStatus.OK);
    }

    @GetMapping(path = "/district")
    public ResponseEntity<List<District>> getDistrictByProvinceId(@RequestParam Long provinceId) {
        return new ResponseEntity<>(addressService.getDistrictByProvinceId(provinceId), HttpStatus.OK);
    }

    @GetMapping(path = "/ward")
    public ResponseEntity<List<Ward>> getWardByDistrictId(@RequestParam Long districtId) {
        return new ResponseEntity<>(addressService.getWardByDistrictId(districtId), HttpStatus.OK);
    }
}
