package com.jimmyproject.churchfinancebackend.contribution;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contributions")
@RequiredArgsConstructor
public class ContributionController {
    private final ContributionService contributionService;

    @PostMapping
   public ResponseEntity<ContributionResponse> createContribution(@RequestBody ContributionRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(contributionService.createContribution(request));

    }

    @GetMapping("/years")
    public ResponseEntity<List<Integer>> getYears(){
        return ResponseEntity.status(HttpStatus.OK).body(contributionService.getAvailableYears());

    }
    @GetMapping("/{contributionId}")
    public ResponseEntity<ContributionResponse> getContributionById(@PathVariable Long contributionId){
        return ResponseEntity.ok(contributionService.getContributionById(contributionId));
    }
    @GetMapping("/member/{memberId}")
    public ResponseEntity<Page<ContributionResponse>> getContributionsByMemberId(@PathVariable Long memberId,@PageableDefault(size=10,sort="createdAt",direction= Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(contributionService.getContributionsByMemberId(memberId, pageable));
    }
    @GetMapping
    public ResponseEntity<Page<ContributionResponse>> getAllContributions(@PageableDefault(size=10,sort="createdAt",direction= Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(contributionService.getAllContributions(pageable));
    }
    @GetMapping("/date-range")
    public ResponseEntity<Page<ContributionResponse>> getContributionsByDateRange(@RequestParam LocalDate from, @RequestParam LocalDate to, @PageableDefault(size=10,sort="createdAt",direction= Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(contributionService.getContributionByDateRange(from, to, pageable));
    }
}
