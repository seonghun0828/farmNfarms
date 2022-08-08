INSERT INTO user (account, address, name, password, phone, data_create)
VALUES ('110-342-143345', 'SSAFY', '홍길동', '1','01000000001', now());


INSERT INTO IMAGE (origin_file_name, server_file_name, file_path, content_type, file_size)
VALUES
('string', 'string1', 'string', 'string', 100),
('string', 'string2', 'string', 'string', 100),
('string', 'string3', 'string', 'string', 100),
('string', 'string4', 'string', 'string', 100),
('string', 'string5', 'string', 'string', 100),
('string', 'string6', 'string', 'string', 100),
('string', 'string7', 'string', 'string', 100),
('string', 'string8', 'string', 'string', 100),
('string', 'string9', 'string', 'string', 100),
('string', 'string10', 'string', 'string', 100);

INSERT INTO AUCTION_ROOM (created_at, auction_room_description, thumbnail_id, auction_room_title, auctioned, owner_id)
VALUES
(now(), 'string1', 1, 'string', false, 1),
(now(), 'string2', 2, 'string', false, 1),
(now(), 'string3', 3, 'string', false, 1),
(now(), 'string4', 4, 'string', false, 1),
(now(), 'string5', 5, 'string', false, 1),
(now(), 'string6', 6, 'string', false, 1),
(now(), 'string7', 7, 'string', false, 1),
(now(), 'string8', 8, 'string', false, 1),
(now(), 'string9', 9, 'string', false, 1),
(now(), 'string10', 10, 'string', false, 1);