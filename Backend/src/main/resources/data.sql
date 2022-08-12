INSERT INTO IMAGE (origin_file_name, server_file_name, file_path, content_type, file_size)
VALUES
('karina.jpg', '202208101037266079035057.jpg', '/root/pictures/202208101037266079035057.jpg', 'image/jpeg', 100),
('dog.png', '202208101037502688086397.png', '/root/pictures/202208101037502688086397.png', 'image/png', 100),
('string', 'string3', 'string', 'string', 100),
('string', 'string4', 'string', 'string', 100),
('string', 'string5', 'string', 'string', 100),
('string', 'string6', 'string', 'string', 100),
('string', 'string7', 'string', 'string', 100),
('string', 'string8', 'string', 'string', 100),
('string', 'string9', 'string', 'string', 100),
('string', 'string9', 'string', 'string', 100);


INSERT INTO AUCTION_ROOM (created_at, auction_room_description, thumbnail_id, auction_room_title, auctioned, owner_id)
VALUES
(now(), '감자감자방', 1, '1번 감자방', false, 1),
(now(), '열정열정열정', 2, '2번 열정 농부방', false, 1),
(now(), '난 멋쟁이야', 3, '3번 멋쟁이 포도방', false, 1),
(now(), '고구마 좋다', 4, '4번 고구마방', false, 1),
(now(), '딸기가 풍년이네', 5, '5번 딸기방', false, 1),
(now(), '감자 맛있어', 6, '6번 맛있는 방', false, 1),
(now(), '농사 잘됨', 7, '7번 풍년방', false, 1),
(now(), '와우~', 8, '8번 와우방', false, 1),
(now(), '들어오세유', 9, '9번 커몬방', false, 1),
(now(), '맛있겠찌?', 10, '10번 드루와방', false, 1);

INSERT INTO AUCTION_DETAIL (bid_increment, grade, product_title, quantity, starting_price, auction_room_id)
VALUES
(10000, '특', '감자', 1000000, 10000, 1),
(10000, '중', '고구마', 1000000, 10000, 1),
(10000, '중', '딸기', 1000000, 10000, 2),
(10000, '상', '사과', 1000000, 10000, 2);


INSERT INTO AUCTION_RESULT (created_at, auctioned_price, deal_completed, payment_completed, delivery_completed, auction_detail_id, seller_id, buyer_id)
VALUES
(now(), 1000000, false, false, false, 1, 1, 2),
(now(), 2000000,false, false, false, 2, 1, 2),
(now(), 300000, false, false, false, 3, 2, 1),
(now(), 400000, false, false, false, 4, 2, 1);