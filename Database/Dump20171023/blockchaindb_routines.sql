-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 52.211.85.57    Database: blockchaindb
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `album_songs`
--

DROP TABLE IF EXISTS `album_songs`;
/*!50001 DROP VIEW IF EXISTS `album_songs`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `album_songs` AS SELECT 
 1 AS `songID`,
 1 AS `albumID`,
 1 AS `artistID`,
 1 AS `Title`,
 1 AS `Explicit`,
 1 AS `Extension`,
 1 AS `song_price`,
 1 AS `Album`,
 1 AS `Released`,
 1 AS `album_price`,
 1 AS `Artist`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_albums`
--

DROP TABLE IF EXISTS `user_albums`;
/*!50001 DROP VIEW IF EXISTS `user_albums`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `user_albums` AS SELECT 
 1 AS `AlbumID`,
 1 AS `Album`,
 1 AS `Released`,
 1 AS `image_path`,
 1 AS `image_name`,
 1 AS `album_price`,
 1 AS `ArtistID`,
 1 AS `email`,
 1 AS `Artist`,
 1 AS `profilepicture`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `playlist_items`
--

DROP TABLE IF EXISTS `playlist_items`;
/*!50001 DROP VIEW IF EXISTS `playlist_items`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `playlist_items` AS SELECT 
 1 AS `playlistid`,
 1 AS `musicID`,
 1 AS `albumID`,
 1 AS `artistID`,
 1 AS `Title`,
 1 AS `Artist`,
 1 AS `Explicit`,
 1 AS `Album`,
 1 AS `Released`,
 1 AS `album_image`,
 1 AS `artist_image`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `song_details`
--

DROP TABLE IF EXISTS `song_details`;
/*!50001 DROP VIEW IF EXISTS `song_details`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `song_details` AS SELECT 
 1 AS `musicID`,
 1 AS `albumID`,
 1 AS `artistID`,
 1 AS `Title`,
 1 AS `song_price`,
 1 AS `Artist`,
 1 AS `Explicit`,
 1 AS `Path`,
 1 AS `Extension`,
 1 AS `Album`,
 1 AS `Released`,
 1 AS `image_path`,
 1 AS `album_image`,
 1 AS `album_price`,
 1 AS `email`,
 1 AS `artist_image`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!50001 DROP VIEW IF EXISTS `artists`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `artists` AS SELECT 
 1 AS `ArtistID`,
 1 AS `email`,
 1 AS `Artist`,
 1 AS `profilepicture`,
 1 AS `bio`,
 1 AS `number_of_albums`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `purchased_songs`
--

DROP TABLE IF EXISTS `purchased_songs`;
/*!50001 DROP VIEW IF EXISTS `purchased_songs`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `purchased_songs` AS SELECT 
 1 AS `idtransaction`,
 1 AS `user__id`,
 1 AS `song_id`,
 1 AS `transactions_date`,
 1 AS `cost`,
 1 AS `musicID`,
 1 AS `Title`,
 1 AS `Explicit`,
 1 AS `Path`,
 1 AS `Extension`,
 1 AS `price`,
 1 AS `album_ID`,
 1 AS `artistID`,
 1 AS `Played`,
 1 AS `user_id`,
 1 AS `username`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_playlists`
--

DROP TABLE IF EXISTS `user_playlists`;
/*!50001 DROP VIEW IF EXISTS `user_playlists`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `user_playlists` AS SELECT 
 1 AS `idplaylist_details`,
 1 AS `User`,
 1 AS `Playlist`,
 1 AS `Created`,
 1 AS `Email`,
 1 AS `Username`,
 1 AS `Items_in_playlist`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_song_details`
--

DROP TABLE IF EXISTS `user_song_details`;
/*!50001 DROP VIEW IF EXISTS `user_song_details`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `user_song_details` AS SELECT 
 1 AS `musicID`,
 1 AS `albumID`,
 1 AS `artistID`,
 1 AS `Title`,
 1 AS `song_price`,
 1 AS `Artist`,
 1 AS `Explicit`,
 1 AS `Path`,
 1 AS `Extension`,
 1 AS `Album`,
 1 AS `Released`,
 1 AS `image_path`,
 1 AS `album_image`,
 1 AS `album_price`,
 1 AS `email`,
 1 AS `artist_image`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `artist_albums`
--

DROP TABLE IF EXISTS `artist_albums`;
/*!50001 DROP VIEW IF EXISTS `artist_albums`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `artist_albums` AS SELECT 
 1 AS `AlbumID`,
 1 AS `Album`,
 1 AS `Released`,
 1 AS `image_path`,
 1 AS `image_name`,
 1 AS `album_price`,
 1 AS `ArtistID`,
 1 AS `email`,
 1 AS `Artist`,
 1 AS `profilepicture`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `album_songs`
--

/*!50001 DROP VIEW IF EXISTS `album_songs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `album_songs` AS select `song`.`musicID` AS `songID`,`song`.`album_ID` AS `albumID`,`song`.`artistID` AS `artistID`,`song`.`Title` AS `Title`,`song`.`Explicit` AS `Explicit`,`song`.`Extension` AS `Extension`,`song`.`price` AS `song_price`,`album`.`album_name` AS `Album`,`album`.`release date` AS `Released`,`album`.`price` AS `album_price`,`users`.`username` AS `Artist` from ((`song` join `album` on((`song`.`album_ID` = `album`.`albumID`))) join `users` on((`song`.`artistID` = `users`.`user_id`))) where (`album`.`released` <> 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_albums`
--

/*!50001 DROP VIEW IF EXISTS `user_albums`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_albums` AS select `album`.`albumID` AS `AlbumID`,`album`.`album_name` AS `Album`,`album`.`release date` AS `Released`,`album`.`image_path` AS `image_path`,`album`.`image_name` AS `image_name`,`album`.`price` AS `album_price`,`users`.`user_id` AS `ArtistID`,`users`.`email` AS `email`,`users`.`username` AS `Artist`,`users`.`profilepicture` AS `profilepicture` from (`users` join `album` on((`users`.`user_id` = `album`.`userid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `playlist_items`
--

/*!50001 DROP VIEW IF EXISTS `playlist_items`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `playlist_items` AS select `playlist`.`playlistid` AS `playlistid`,`song_details`.`musicID` AS `musicID`,`song_details`.`albumID` AS `albumID`,`song_details`.`artistID` AS `artistID`,`song_details`.`Title` AS `Title`,`song_details`.`Artist` AS `Artist`,`song_details`.`Explicit` AS `Explicit`,`song_details`.`Album` AS `Album`,`song_details`.`Released` AS `Released`,`song_details`.`album_image` AS `album_image`,`song_details`.`artist_image` AS `artist_image` from (`playlist` join `song_details` on((`playlist`.`song` = `song_details`.`musicID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `song_details`
--

/*!50001 DROP VIEW IF EXISTS `song_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `song_details` AS select `song`.`musicID` AS `musicID`,`song`.`album_ID` AS `albumID`,`song`.`artistID` AS `artistID`,`song`.`Title` AS `Title`,`song`.`price` AS `song_price`,`users`.`username` AS `Artist`,`song`.`Explicit` AS `Explicit`,`song`.`Path` AS `Path`,`song`.`Extension` AS `Extension`,`album`.`album_name` AS `Album`,`album`.`release date` AS `Released`,`album`.`image_path` AS `image_path`,`album`.`image_name` AS `album_image`,`album`.`price` AS `album_price`,`users`.`email` AS `email`,`users`.`profilepicture` AS `artist_image` from ((`song` join `album` on((`song`.`album_ID` = `album`.`albumID`))) join `users` on((`song`.`artistID` = `users`.`user_id`))) where (`album`.`released` <> 0) order by `song`.`Played` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `artists`
--

/*!50001 DROP VIEW IF EXISTS `artists`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `artists` AS select `blockchaindb`.`users`.`user_id` AS `ArtistID`,`blockchaindb`.`users`.`email` AS `email`,`blockchaindb`.`users`.`username` AS `Artist`,`blockchaindb`.`users`.`profilepicture` AS `profilepicture`,`blockchaindb`.`users`.`bio` AS `bio`,`t`.`number_of_albums` AS `number_of_albums` from ((`blockchaindb`.`users` join `blockchaindb`.`album` on((`blockchaindb`.`users`.`user_id` = `blockchaindb`.`album`.`userid`))) join (select `blockchaindb`.`album`.`userid` AS `userid`,count(`blockchaindb`.`album`.`albumID`) AS `number_of_albums` from `blockchaindb`.`album` group by `blockchaindb`.`album`.`userid`) `t` on((`t`.`userid` = `blockchaindb`.`users`.`user_id`))) where (`blockchaindb`.`album`.`released` <> 0) group by `blockchaindb`.`users`.`user_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `purchased_songs`
--

/*!50001 DROP VIEW IF EXISTS `purchased_songs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `purchased_songs` AS select `transaction`.`idtransaction` AS `idtransaction`,`transaction`.`user__id` AS `user__id`,`transaction`.`song_id` AS `song_id`,`transaction`.`transactions_date` AS `transactions_date`,`transaction`.`cost` AS `cost`,`song`.`musicID` AS `musicID`,`song`.`Title` AS `Title`,`song`.`Explicit` AS `Explicit`,`song`.`Path` AS `Path`,`song`.`Extension` AS `Extension`,`song`.`price` AS `price`,`song`.`album_ID` AS `album_ID`,`song`.`artistID` AS `artistID`,`song`.`Played` AS `Played`,`users`.`user_id` AS `user_id`,`users`.`username` AS `username` from ((`transaction` join `song` on((`transaction`.`song_id` = `song`.`musicID`))) join `users` on((`transaction`.`user__id` = `users`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_playlists`
--

/*!50001 DROP VIEW IF EXISTS `user_playlists`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_playlists` AS select `blockchaindb`.`playlist_details`.`idplaylist_details` AS `idplaylist_details`,`blockchaindb`.`playlist_details`.`iduser` AS `User`,`blockchaindb`.`playlist_details`.`plname` AS `Playlist`,`blockchaindb`.`playlist_details`.`plage` AS `Created`,`blockchaindb`.`users`.`email` AS `Email`,`blockchaindb`.`users`.`username` AS `Username`,`t`.`items in list` AS `Items_in_playlist` from ((`blockchaindb`.`playlist_details` join `blockchaindb`.`users` on((`blockchaindb`.`users`.`user_id` = `blockchaindb`.`playlist_details`.`iduser`))) join (select `blockchaindb`.`playlist`.`playlistid` AS `playlistid`,count(`blockchaindb`.`playlist`.`playlistid`) AS `items in list` from `blockchaindb`.`playlist` group by `blockchaindb`.`playlist`.`playlistid`) `t` on((`t`.`playlistid` = `blockchaindb`.`playlist_details`.`idplaylist_details`))) group by `blockchaindb`.`playlist_details`.`idplaylist_details` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_song_details`
--

/*!50001 DROP VIEW IF EXISTS `user_song_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_song_details` AS select `song`.`musicID` AS `musicID`,`song`.`album_ID` AS `albumID`,`song`.`artistID` AS `artistID`,`song`.`Title` AS `Title`,`song`.`price` AS `song_price`,`users`.`username` AS `Artist`,`song`.`Explicit` AS `Explicit`,`song`.`Path` AS `Path`,`song`.`Extension` AS `Extension`,`album`.`album_name` AS `Album`,`album`.`release date` AS `Released`,`album`.`image_path` AS `image_path`,`album`.`image_name` AS `album_image`,`album`.`image_name` AS `album_price`,`users`.`email` AS `email`,`users`.`profilepicture` AS `artist_image` from ((`song` join `album` on((`song`.`album_ID` = `album`.`albumID`))) join `users` on((`song`.`artistID` = `users`.`user_id`))) order by `song`.`Played` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `artist_albums`
--

/*!50001 DROP VIEW IF EXISTS `artist_albums`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`philip`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `artist_albums` AS select `album`.`albumID` AS `AlbumID`,`album`.`album_name` AS `Album`,`album`.`release date` AS `Released`,`album`.`image_path` AS `image_path`,`album`.`image_name` AS `image_name`,`album`.`price` AS `album_price`,`users`.`user_id` AS `ArtistID`,`users`.`email` AS `email`,`users`.`username` AS `Artist`,`users`.`profilepicture` AS `profilepicture` from (`users` join `album` on((`users`.`user_id` = `album`.`userid`))) where (`album`.`released` <> 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping events for database 'blockchaindb'
--

--
-- Dumping routines for database 'blockchaindb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-23 16:57:52
