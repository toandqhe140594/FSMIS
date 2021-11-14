package fpt.g31.fsmis.controller;


import fpt.g31.fsmis.dto.input.*;
import fpt.g31.fsmis.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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
    private final ReportService reportService;


    @GetMapping("/search")
    public ResponseEntity<Object> searchFishingLocation(@RequestBody FilterDtoIn filterDtoIn,
                                                        @RequestParam(required = false, defaultValue = "1") int pageNo){
        return new ResponseEntity<>(fishingLocationService.searchFishingLocation(filterDtoIn, pageNo), HttpStatus.OK);
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

    @PostMapping("/switch-state/{locationId}")
    public ResponseEntity<Object> switchLocationState(HttpServletRequest request,
                                                      @PathVariable Long locationId) {
        return new ResponseEntity<>(fishingLocationService.switchLocationState(request, locationId), HttpStatus.OK);
    }

    @PostMapping("/report/{locationId}")
    public ResponseEntity<Object> reportFishingLocation(HttpServletRequest request,
                                                        @PathVariable Long locationId,
                                                        @RequestBody ReportDtoIn reportDtoIn) {
        return new ResponseEntity<>(reportService.reportFishingLocation(request, locationId, reportDtoIn), HttpStatus.OK);
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
    public ResponseEntity<Object> editLake(@RequestBody @Valid LakeEditDtoIn lakeEditDtoIn,
                                           @PathVariable Long lakeId,
                                           HttpServletRequest request) {
        return new ResponseEntity<>(lakeService.editLakeInformation(lakeEditDtoIn, lakeId, request), HttpStatus.OK);
    }

    @PostMapping("/lake/{lakeId}/fish/add")
    public ResponseEntity<Object> addFishToLake(@RequestBody @Valid FishInLakeDtoIn fishInLakeDtoIn,
                                                @PathVariable Long lakeId,
                                                HttpServletRequest request) {
        return new ResponseEntity<>(lakeService.addFishToLake(fishInLakeDtoIn, lakeId, request), HttpStatus.OK);
    }

    @PostMapping("/lake/fish/stocking/{fishInLakeId}")
    public ResponseEntity<Object> fishStocking(@PathVariable Long fishInLakeId,
                                               HttpServletRequest request,
                                               @RequestParam(required = false) Float weight,
                                               @RequestParam(required = false) Integer quantity) {
        return new ResponseEntity<>(lakeService.fishStocking(fishInLakeId, request, weight, quantity), HttpStatus.OK);
    }

    @DeleteMapping("/lake/fish/delete/{fishInLakeId}")
    public ResponseEntity<Object> deleteFishFromLake(@PathVariable Long fishInLakeId,
                                                     HttpServletRequest request) {
        return new ResponseEntity<>(lakeService.deleteFishFromLake(fishInLakeId, request), HttpStatus.OK);
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
    public ResponseEntity<Object> checkIn(@PathVariable Long locationId,
                                          @RequestBody @Valid CheckInDtoIn checkInDtoIn,
                                          HttpServletRequest request) {
        return new ResponseEntity<>(checkInService.checkIn(checkInDtoIn, locationId, request), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/checkin/status")
    public ResponseEntity<Object> isCheckedIn(@PathVariable Long locationId, HttpServletRequest request) {
        return new ResponseEntity<>(checkInService.isCheckedIn(locationId, request), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/checkin/history")
    public ResponseEntity<Object> getLocationCheckInHistory(@PathVariable Long locationId,
                                                            HttpServletRequest request,
                                                            @RequestParam(required = false, defaultValue = "1") Integer pageNo,
                                                            @RequestParam(required = false) String startDate,
                                                            @RequestParam(required = false) String endDate) {
        return new ResponseEntity<>(checkInService.getLocationCheckInHistory(locationId, request, pageNo, startDate, endDate), HttpStatus.OK);
    }


    // CHECK-OUT
    @PostMapping("/checkout")
    public ResponseEntity<Object> checkOut(HttpServletRequest request) {
        return new ResponseEntity<>(checkInService.checkOut(request), HttpStatus.OK);
    }

    // CATCH
    @GetMapping("/{locationId}/catch/public")
    public ResponseEntity<Object> getLocationPublicCatchesList(@PathVariable Long locationId, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(catchesService.getLocationPublicCatchesList(locationId, pageNo), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/catch/history")
    public ResponseEntity<Object> getLocationCatchesHistory(HttpServletRequest request,
                                                            @PathVariable Long locationId,
                                                            @RequestParam(defaultValue = "1") int pageNo,
                                                            @RequestParam(required = false) String startDate,
                                                            @RequestParam(required = false) String endDate) {
        return new ResponseEntity<>(catchesService.getLocationCatchesHistory(request, locationId, pageNo, startDate, endDate), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/catch/pending")
    public ResponseEntity<Object> getPendingCatchReportList(HttpServletRequest request, @PathVariable Long locationId, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(catchesService.getPendingCatchReports(request, locationId, pageNo), HttpStatus.OK);
    }


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

    @DeleteMapping("/{locationId}/review/me/delete")
    public ResponseEntity<Object> deleteReview(HttpServletRequest request,
                                               @PathVariable Long locationId) {
        return new ResponseEntity<>(reviewService.deleteReview(request, locationId), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/review/{reviewId}")
    public ResponseEntity<Object> upvoteReview(HttpServletRequest request,
                                               @PathVariable Long reviewId,
                                               @RequestParam(defaultValue = "1") Long vote) {
        return new ResponseEntity<>(voteService.vote(request, reviewId, vote), HttpStatus.OK);
    }

    @PostMapping("/review/report/{reviewId}")
    public ResponseEntity<Object> reportReview(HttpServletRequest request,
                                               @PathVariable Long reviewId,
                                               @RequestBody @Valid ReportDtoIn reportDtoIn) {
        return new ResponseEntity<>(reportService.reportReview(request, reviewId, reportDtoIn), HttpStatus.OK);
    }


    // POST

    @GetMapping("/{locationId}/post")
    @ApiOperation(value = "Get location's post list")
    public ResponseEntity<Object> getPostListByLocationId(@PathVariable Long locationId,
                                                          @RequestParam(defaultValue = "1") Integer pageNo) {
        return new ResponseEntity<>(postService.getPostByLocationId(locationId, pageNo), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/post/pinned")
    @ApiOperation(value = "Get location's pinned post")
    public ResponseEntity<Object> getPinnedPost(@PathVariable Long locationId) {
        return new ResponseEntity<>(postService.getPinnedPost(locationId), HttpStatus.OK);
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

    @PostMapping("/post/report/{postId}")
    public ResponseEntity<Object> reportPost(HttpServletRequest request,
                                             @PathVariable Long postId,
                                             @RequestBody @Valid ReportDtoIn reportDtoIn) {
        return new ResponseEntity<>(reportService.reportPost(request, postId, reportDtoIn), HttpStatus.OK);
    }

    @PostMapping("post/pin/{postId}")
    @ApiOperation(value = "Pin post", notes = "Pass a pinned post's id to unpin it")
    public ResponseEntity<Object> pinPost(HttpServletRequest request,
                                          @PathVariable Long postId) {
        return new ResponseEntity<>(postService.pinPost(request, postId), HttpStatus.OK);
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

    @DeleteMapping("/{locationId}/staff/delete/{staffId}")
    public ResponseEntity<Object> deleteStaff(@PathVariable Long locationId,
                                              @PathVariable Long staffId,
                                              HttpServletRequest request) {
        return new ResponseEntity<>(fishingLocationService.deleteStaff(locationId, staffId, request), HttpStatus.OK);
    }

}
