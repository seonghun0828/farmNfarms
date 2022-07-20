package com.ssafy.util;

import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomNumberGenerator {

    public static final int START_INCLUSIVE = 100000;
    public static final int END_EXCLUSIVE = 999999;

    //Random 써도 되지만 동시성 이슈
    private final ThreadLocalRandom random = ThreadLocalRandom.current();

    public String generate() {
        int randomNumber = random.nextInt(START_INCLUSIVE) + END_EXCLUSIVE;
        return String.valueOf(randomNumber);
    }

}
