
package com.ssafy.domain.product;

import com.ssafy.domain.grade.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

