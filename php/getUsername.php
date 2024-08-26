<?php
session_start();
//prendo username da session con username e success
echo json_encode ($_SESSION['username']);