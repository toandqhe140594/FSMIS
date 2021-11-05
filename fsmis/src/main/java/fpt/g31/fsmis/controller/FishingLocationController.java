package fpt.g31.fsmis.controller;


import fpt.g31.fsmis.dto.input.FishingLocationDtoIn;
import fpt.g31.fsmis.dto.input.LakeDtoIn;
import fpt.g31.fsmis.dto.input.PostDtoIn;
import fpt.g31.fsmis.dto.input.ReviewDtoIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/location")
@AllArgsConstructor
public class FishingLocationController {
    private final CheckInService checkInService;
    private final FishingLocationService fishingLocationService;
    private final LakeService lakeService;
    private final PostService postService;
    private final UserService userService;
    private final CatchesService catchesService;
    private final ReviewService reviewService;
    private final VoteService voteService;

    @GetMapping(path = "/all")
    public ResponseEntity<Object> getAll() {
        List<FishingLocation> fishingLocations = fishingLocationService.findAllFishingLocations();
        return new ResponseEntity<>(fishingLocations, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> createFishingLocation(@Valid @RequestBody FishingLocationDtoIn fishingLocationDtoIn,
                                                        HttpServletRequest request) {
        return new ResponseEntity<>(fishingLocationService.createFishingLocation(fishingLocationDtoIn, request), HttpStatus.CREATED);
    }

    @PutMapping("/edit/{locationId}")
    public ResponseEntity<Object> editFishingLocation(@Valid @RequestBody FishingLocationDtoIn fishingLocationDtoIn,
                                                      HttpServletRequest request,
                                                      @PathVariable Long locationId) {
        return new ResponseEntity<>(fishingLocationService.editFishingLocation(fishingLocationDtoIn, request, locationId), HttpStatus.OK);
    }

    @DeleteMapping("/close/{locationId}")
    public ResponseEntity<Object> closeFishingLocation(HttpServletRequest request, @PathVariable Long locationId) {
        return new ResponseEntity<>(fishingLocationService.disableFishingLocation(request, locationId), HttpStatus.OK);
    }

    @GetMapping("/nearby")
    public ResponseEntity<Object> getNearBy(@RequestParam Float latitude, @RequestParam Float longitude,
                                            @RequestParam Integer distance, @RequestParam Long methodId,
                                            @RequestParam Integer minRating) {
        return new ResponseEntity<>(fishingLocationService.getNearBy(longitude, latitude, distance, methodId, minRating), HttpStatus.OK);
    }

    // FISHING LOCATION

    @GetMapping(path = "/{locationId}")
    public ResponseEntity<Object> getFishingLocationOverviewById(HttpServletRequest request, @PathVariable Long locationId) {
        return new ResponseEntity<>(fishingLocationService.getFishingLocationOverviewById(request, locationId), HttpStatus.OK);
    }

    @GetMapping("/manager")
    public ResponseEntity<Object> getOwnedFishingLocation(HttpServletRequest request) {
        return new ResponseEntity<>(fishingLocationService.getOwnedFishingLocation(request), HttpStatus.OK);
    }

    // LAKE

    @GetMapping("/{locationId}/lake")
    public ResponseEntity<Object> getAllLakeByLocationId(@PathVariable Long locationId) {
        return new ResponseEntity<>(lakeService.getAllByLocationId(locationId), HttpStatus.OK);
    }

    @GetMapping("/fishes/{locationId}")
    public ResponseEntity<Object> getAllLakeWithFishInLake(@PathVariable Long locationId) {
        return new ResponseEntity<>(lakeService.getAllLakeWithFishInLake(locationId), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/lake/{lakeId}")
    public ResponseEntity<Object> getLakeById(@PathVariable Long locationId, @PathVariable Long lakeId) {
        return new ResponseEntity<>(lakeService.getLakeById(locationId, lakeId), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/lake/add")
    public ResponseEntity<Object> createLake(@RequestBody @Valid LakeDtoIn lakeDtoIn,
                                             @PathVariable Long locationId,
                                             HttpServletRequest request) {
        return new ResponseEntity<>(lakeService.createLake(lakeDtoIn, locationId, request), HttpStatus.CREATED);
    }

    @PutMapping("{locationId}/lake/edit/{lakeId}")
    public ResponseEntity<Object> editLake(@RequestBody @Valid LakeDtoIn lakeDtoIn,
                                           @PathVariable Long lakeId,
                                           HttpServletRequest request) {
        return new ResponseEntity<>(lakeService.editLakeInformation(lakeDtoIn, lakeId, request), HttpStatus.OK);
    }

    @DeleteMapping("/{locationId}/lake/close/{lakeId}")
    public ResponseEntity<Object> closeLake(@PathVariable Long lakeId,
                                            HttpServletRequest request) {
        return new ResponseEntity<>(lakeService.closeLake(lakeId, request), HttpStatus.OK);
    }

    // SAVE
    @PostMapping("/{locationId}/save")
    public ResponseEntity<Object> saveFishingLocation(HttpServletRequest request, @PathVariable Long locationId) {
        return new ResponseEntity<>(fishingLocationService.saveFishingLocation(request, locationId), HttpStatus.OK);
    }

    // CHECK-IN
    @PostMapping("/{locationId}/checkin")
    public ResponseEntity<Object> checkIn(@PathVariable Long locationId, @RequestBody String qrString) {
        return new ResponseEntity<>(checkInService.checkIn(qrString, locationId), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/checkin/status")
    public ResponseEntity<Object> isCheckedIn(@PathVariable Long locationId, HttpServletRequest request) {
        return new ResponseEntity<>(checkInService.isCheckedIn(locationId, request), HttpStatus.OK);
    }

    // CHECK-OUT
    @PostMapping("/checkout")
    public ResponseEntity<Object> checkOut(HttpServletRequest request) {
        return new ResponseEntity<>(checkInService.checkOut(request), HttpStatus.OK);
    }

    // CATCH

    @GetMapping("/{locationId}/catch")
    public ResponseEntity<Object> getPostedCatchesListByLocationId(@PathVariable Long locationId, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(catchesService.getPostedCatchesListByLocationId(locationId, pageNo), HttpStatus.OK);
    }

    // TODO: chưa có filter
    @GetMapping("/{locationId}/catch/manager")
    public ResponseEntity<Object> getPublicCatchesListByLocationId(HttpServletRequest request, @PathVariable Long locationId, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(catchesService.getPublicCatchesListByLocationId(request, locationId, pageNo), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/catch/pending")
    public ResponseEntity<Object> getPendingCatchReportList(HttpServletRequest request, @PathVariable Long locationId, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(catchesService.getPendingCatchReports(request, locationId, pageNo), HttpStatus.OK);
    }

    // TODO: Báo cá
//    @PostMapping("/{locationId}/catch/report")

    // REVIEW

    @GetMapping("/{locationId}/review")
    public ResponseEntity<Object> getAllReviews(HttpServletRequest request,
                                                @PathVariable Long locationId,
                                                @RequestParam(defaultValue = "newest") String filter,
                                                @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(reviewService.getAllReviews(request, locationId, filter, pageNo), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/review/score")
    public ResponseEntity<Object> getReviewScore(@PathVariable Long locationId) {
        return new ResponseEntity<>(reviewService.getReviewScore(locationId), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/review/me")
    public ResponseEntity<Object> getMyReview(HttpServletRequest request,
                                              @PathVariable Long locationId) {
        return new ResponseEntity<>(reviewService.getMyReview(request, locationId), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/review/me/post")
    public ResponseEntity<Object> postReview(HttpServletRequest request,
                                             @PathVariable Long locationId,
                                             @RequestBody ReviewDtoIn reviewDtoIn) {
        return new ResponseEntity<>(reviewService.postReview(request, locationId, reviewDtoIn), HttpStatus.OK);
    }

//    @PostMapping("/{locationId}/review/me/edit")
//    public ResponseEntity<Object> editReview(HttpServletRequest request, @PathVariable Long locationId, @RequestBody ReviewDtoIn reviewDtoIn) {
//        return new ResponseEntity<>(reviewService.editReview(request, locationId, reviewDtoIn), HttpStatus.OK);
//    }

    @DeleteMapping("/{locationId}/review/me/delete")
    public ResponseEntity<Object> deleteReview(HttpServletRequest request,
                                               @PathVariable Long locationId) {
        return new ResponseEntity<>(reviewService.deleteReview(request, locationId), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/review/{reviewId}")
    public ResponseEntity<Object> upvoteReview(HttpServletRequest request,
                                               @PathVariable Long locationId,
                                               @PathVariable Long reviewId,
                                               @RequestParam(defaultValue = "1") Long vote) {
        return new ResponseEntity<>(voteService.vote(request, reviewId, vote), HttpStatus.OK);
    }

    // POST

    @GetMapping("/{locationId}/post")
    public ResponseEntity<Object> getPostListByLocationId(@PathVariable Long locationId,
                                                          @RequestParam(defaultValue = "1") Integer pageNo) {
        return new ResponseEntity<>(postService.getPostByLocationId(locationId, pageNo), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/post/add")
    public ResponseEntity<Object> createPost(@PathVariable Long locationId,
                                             @RequestBody @Valid PostDtoIn postDtoIn,
                                             HttpServletRequest request) {
        return new ResponseEntity<>(postService.savePost(locationId, postDtoIn, request, true), HttpStatus.OK);
    }

    @PutMapping("/{locationId}/post/edit")
    public ResponseEntity<Object> editPost(@PathVariable Long locationId,
                                           HttpServletRequest request,
                                           @RequestBody PostDtoIn postDtoIn) {
        return new ResponseEntity<>(postService.savePost(locationId, postDtoIn, request, false), HttpStatus.OK);
    }

    @DeleteMapping("/{locationId}/post/delete/{postId}")
    public ResponseEntity<Object> deletePost(@PathVariable Long locationId,
                                             @PathVariable Long postId,
                                             HttpServletRequest request) {
        return new ResponseEntity<>(postService.deletePost(postId, request), HttpStatus.OK);
    }
    // STAFF

    @GetMapping("/{locationId}/staff")
    public ResponseEntity<Object> getStaff(@PathVariable Long locationId, HttpServletRequest request) {
        return new ResponseEntity<>(fishingLocationService.getStaff(locationId, request), HttpStatus.OK);
    }

    @GetMapping("{locationId}/staff/{staffId}")
    public ResponseEntity<Object> getStaffDetail(@PathVariable Long locationId,
                                                 @PathVariable Long staffId,
                                                 HttpServletRequest request) {
        return new ResponseEntity<>(fishingLocationService.getStaffDetail(locationId, staffId, request), HttpStatus.OK);
    }

    @PostMapping("/findUserByPhone/{phone}")
    public ResponseEntity<Object> findUserByPhone(@PathVariable String phone) {
        return new ResponseEntity<>(userService.findUserByPhone(phone), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/staff/add/{userId}")
    public ResponseEntity<Object> addStaff(@PathVariable Long locationId,
                                           HttpServletRequest request,
                                           @PathVariable Long userId) {
        return new ResponseEntity<>(fishingLocationService.addStaff(locationId, userId, request), HttpStatus.OK);
    }

    //
//    @GetMapping("/{locationId}/staff/{staffId}")
//
    @DeleteMapping("/{locationId}/staff/delete/{staffId}")
    public ResponseEntity<Object> deleteStaff(@PathVariable Long locationId,
                                              @PathVariable Long staffId,
                                              HttpServletRequest request) {
        return new ResponseEntity<>(fishingLocationService.deleteStaff(locationId, staffId, request), HttpStatus.OK);
    }

    // REPORT
//    @PostMapping("/{locationId}/report")
//    public ResponseEntity<Object> reportLocation(@PathVariable Long locationId, HttpServletRequest request, ReportDtoIn reportDtoIn){
//        return new ResponseEntity<>()
//    }
}
