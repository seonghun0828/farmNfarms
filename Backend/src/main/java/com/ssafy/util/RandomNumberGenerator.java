package com.ssafy.util;

import org.springframework.stereotype.Component;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomNumberGenerator {

    public static final int START_INCLUSIVE = 100000;
    public static final int END_EXCLUSIVE = 999999;

    // Random 써도 되지만 동시성 이슈
    // 서버를 껐다 켜지 않으면 번호가 같은 이슈  --> 일단 Java.util.Random 사용
//    private final ThreadLocalRandom random = ThreadLocalRandom.current();

    private final Random random = new Random();

    public String generate() {
//        int randomNumber = random.nextInt(START_INCLUSIVE, END_EXCLUSIVE) + START_INCLUSIVE;
//        return String.valueOf(randomNumber);

        String randomNumber = Integer.toString(random.nextInt(899999) + 100000);
        return randomNumber;
    }

}
