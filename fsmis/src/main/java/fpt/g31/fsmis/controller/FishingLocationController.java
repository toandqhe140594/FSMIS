package fpt.g31.fsmis.controller;


import fpt.g31.fsmis.dto.input.FishingLocationDtoIn;
import fpt.g31.fsmis.dto.input.LakeDtoIn;
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
    final CheckInService checkInService;
    final FishingLocationService fishingLocationService;
    final LakeService lakeService;
    final PostService postService;
    private final ReviewService reviewService;
    private final VoteService voteService;

    @GetMapping(path = "/all")
    public ResponseEntity<Object> getAll() {
        List<FishingLocation> fishingLocations = fishingLocationService.findAllFishingLocations();
        return new ResponseEntity<>(fishingLocations, HttpStatus.OK);
    }

    @GetMapping(path = "/{locationId}")
    public ResponseEntity<Object> getById(@PathVariable Long locationId) {
        return new ResponseEntity<>(fishingLocationService.getById(locationId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> createFishingLocation(@Valid @RequestBody FishingLocationDtoIn fishingLocationDtoIn) {
        return new ResponseEntity<>(fishingLocationService.createFishingLocation(fishingLocationDtoIn), HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Object> disableFishingLocation(@RequestParam Long fishingLocationId, @RequestParam Long ownerId) {
        return new ResponseEntity<>(fishingLocationService.disableFishingLocation(fishingLocationId, ownerId), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/lake")
    public ResponseEntity<Object> createLake(@RequestBody @Valid LakeDtoIn lakeDtoIn, @PathVariable Long locationId) {
        return new ResponseEntity<>(lakeService.createLake(lakeDtoIn, locationId), HttpStatus.CREATED);
    }

    @GetMapping("/nearby")
    public ResponseEntity<Object> getNearBy(@RequestParam Float latitude, @RequestParam Float longitude,
                                            @RequestParam Integer distance, @RequestParam Long methodId,
                                            @RequestParam Integer minRating) {
        return new ResponseEntity<>(fishingLocationService.getNearBy(longitude, latitude, distance, methodId, minRating), HttpStatus.OK);
    }

    // FISHING LOCATION

    // LAKE

    @GetMapping("/{locationId}/lake")
    public ResponseEntity<Object> getAllLakeByLocationId(@PathVariable Long locationId) {
        return new ResponseEntity<>(lakeService.getAllByLocationId(locationId), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/lake/{lakeId}")
    public ResponseEntity<Object> getLakeById(@PathVariable Long locationId, @PathVariable Long lakeId) {
        return new ResponseEntity<>(lakeService.getLakeById(locationId, lakeId), HttpStatus.OK);
    }


    // CHECK-IN

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
    public ResponseEntity<Object> postReview(HttpServletRequest request, @PathVariable Long locationId, @RequestBody ReviewDtoIn reviewDtoIn) {
        return new ResponseEntity<>(reviewService.postReview(request, locationId, reviewDtoIn), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/review/me/edit")
    public ResponseEntity<Object> editReview(HttpServletRequest request, @PathVariable Long locationId, @RequestBody ReviewDtoIn reviewDtoIn) {
        return new ResponseEntity<>(reviewService.editReview(request, locationId, reviewDtoIn), HttpStatus.OK);
    }

    @DeleteMapping("/{locationId}/review/me/delete")
    public ResponseEntity<Object> deleteReview(HttpServletRequest request, @PathVariable Long locationId) {
        return new ResponseEntity<>(reviewService.deleteReview(request, locationId), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/review/{reviewId}")
    public ResponseEntity<Object> upvoteReview(HttpServletRequest request,
                                               @PathVariable Long locationId,
                                               @PathVariable Long reviewId,
                                               @RequestParam(defaultValue = "1") Long vote) {
        return new ResponseEntity<>(voteService.vote(request, reviewId, vote), HttpStatus.OK);
    }

//    @PostMapping("/{locationId}/review/{reviewId}/report")

    // POST

    @GetMapping("/{locationId}/post")
    public ResponseEntity<Object> getPostListByLocationId(@PathVariable Long locationId, @RequestParam(defaultValue = "1") Integer pageNo) {
        return new ResponseEntity<>(postService.getPostByLocationId(locationId, pageNo), HttpStatus.OK);
    }

//    @GetMapping("/{locationId}/post/add")
//
//    @PostMapping("/{locationId}/post/{postId}/edit")
//
//    @DeleteMapping("/{locationId}/post/{postId}/delete")
//
//    @PostMapping("/{locationId}/post/{id}/report")

    // STAFF

//    @GetMapping("/{locationId}/staff")
//
//    @PostMapping("/{locationId}/staff/add")
//
//    @GetMapping("/{locationId}/staff/{staffId}")
//
//    @DeleteMapping("/{locationId}/staff/{staffId}/delete")
}
