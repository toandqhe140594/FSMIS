package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.BanPhoneDtoIn;
import fpt.g31.fsmis.service.BanService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin/ban")
@AllArgsConstructor
public class AdminBanController {

    private final BanService banService;

    @GetMapping()
    public ResponseEntity<Object> getBannedPhoneList() {
        return new ResponseEntity<>(banService.getBannedPhoneList(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> banPhone(@RequestBody @Valid BanPhoneDtoIn banPhoneDtoIn) {
        return new ResponseEntity<>(banService.banPhone(banPhoneDtoIn), HttpStatus.OK);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Object> unbanPhone(@RequestParam String phone) {
        return new ResponseEntity<>(banService.unbanPhone(phone), HttpStatus.OK);
    }
}
