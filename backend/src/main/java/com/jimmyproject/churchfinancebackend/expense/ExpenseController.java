package com.jimmyproject.churchfinancebackend.expense;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(@RequestBody @Valid ExpenseRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.createExpense(request));
    }
    @GetMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponse> getExpense(@PathVariable Long expenseId){
        return ResponseEntity.ok(expenseService.getExpense(expenseId));
    }
    @GetMapping
    public ResponseEntity<Page<ExpenseResponse>> getAllExpenses(@RequestParam(required = false) LocalDate from,@RequestParam(required=false) LocalDate to, @PageableDefault(size=10,sort = "createdAt", direction= Sort.Direction.DESC)Pageable pageable){
        if(from != null  && to !=null){
            return ResponseEntity.ok(expenseService.getExpensesByDateBetween(from, to, pageable));
        }
        if(from !=null){
            return ResponseEntity.ok(expenseService.getExpensesByGreaterThanEqual(from, pageable));
        }
        if(to !=null){
            return ResponseEntity.ok(expenseService.getExpensesByLessThanEqual(to, pageable));
        }

        return ResponseEntity.ok(expenseService.getAllExpenses(pageable));
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long expenseId){
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.ok().build();
    }
    @PatchMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponse> updateExpense(@PathVariable Long expenseId, @RequestBody @Valid ExpenseRequest request){
        return ResponseEntity.ok(expenseService.updateExpense(expenseId, request));
    }

}
