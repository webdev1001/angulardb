<?php

/*
	This file is part of angulardb, a web design and SEO marketing
	database front- and back-end application.
	Copyright (C) 2014  Aaron John Schlosser

	This program is free software; you can redistribute it and/or
	modify it under the terms of the GNU General Public License
	as published by the Free Software Foundation; either version 2
	of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

 	require_once("Rest.inc.php");
	
	class API extends REST {
	
		// Variables
		public $data = "";

		const DB_SERVER = "localhost";
		const DB_USER = "root";
		const DB_PASSWORD = "";
		const DB = "angular_test";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct() {
			parent::__construct();
			$this->dbConnect();	
		}
		
		// Initialization
		public function init() {
			$func = strtolower(trim(str_replace("/","",$_REQUEST["x"])));
			if((int)method_exists($this,$func) > 0) $this->$func();
			else $this->response("",404);
		}

		// Utility Functions
		private function jsonify($data) { if(is_array($data)) return json_encode($data); }
		private function checkSha1($s) { if(preg_match("/^[A-Fa-f0-9]{40}$/", $s) > 0) return true; return false; }

		// Database Functions
		private function dbConnect() { $this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB); }
		private function parseQuery($query) {
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()) $result[] = $row;
				$this->response($this->jsonify($result), 200);
			}
			$this->response("",204);
		}
		private function getParsedQuery($query) {
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()) $result[] = $row;
				return $this->jsonify($result);
			}
			return null;
		}
		private function getUnParsedQuery($query) {
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()) $result[] = $row;
				return $result;
			}
			return null;
		}

		// API Functions
		private function authenticateUser($user, $pass) {
			if ($this->checkSha1($user) && $this->checkSha1($pass)) {
				$query = "SELECT u.* FROM admin u WHERE SHA1(BINARY u.admin_username)='".$user."'";
				$result = $this->getUnParsedQuery($query);
				if ($result) {
					$stored_pass = $result[0]["admin_password"];
					if ($pass == $stored_pass) return $result;
					echo "Error: Password does not match.";
					return null;
				}
			}
		}
		private function loginUser() {
			$user = $_GET["user"];
			$pass = $_GET["pass"];
			$result = $this->authenticateUser($user, $pass) or die(" Failed to login.");
			if ($result)
				$this->response($this->jsonify($result), 200);
			echo "Error: Incorrect parameters." . $_SERVER["REQUEST_URI"];
			return false;
		}
		private function getUsers() {
			$this->check_request_method();
			$query = "SELECT u.admin_firstname,
				u.admin_lastname,
				u.admin_username,
				u.admin_email,
				u.admin_phone,
				u.admin_title from admin u";
			$this->parseQuery($query);
		}
		private function getLogins() {
			$this->check_request_method();
			$query =
				"SELECT w.website_id, w.website_name,
					ls.*
				FROM website w
				LEFT JOIN
					(SELECT l.website_id AS l_website_id,
						GROUP_CONCAT(l.login_id) AS l_login_ids,
						GROUP_CONCAT(l.login_type) AS l_login_types,
						GROUP_CONCAT(l.login_connection) AS l_login_connections,
						GROUP_CONCAT(l.login_username) AS l_login_usernames,
						GROUP_CONCAT(l.login_password) AS l_login_passwords
						FROM login l GROUP BY l.website_id) ls
					ON ls.l_website_id = w.website_id";
			$this->parseQuery($query);
		}
		private function getClients() {	
			$this->check_request_method();
			$query =
				"SELECT c.*,
					ws.*
				FROM client c
				LEFT JOIN
					(SELECT w.client_id AS w_client_id,
						GROUP_CONCAT(w.website_name) AS w_website_names,
						GROUP_CONCAT(w.website_url) AS w_website_urls,
						GROUP_CONCAT(CONVERT(w.website_id, CHAR(16))) AS w_website_ids
						FROM website w GROUP BY w.client_id) ws
					ON ws.w_client_id = c.client_id";
			$this->parseQuery($query);
		}
		function updateClient() {
			$postdata = file_get_contents("php://input");
			$request = json_decode($postdata);
			$msg_mysqli_fail = "Failed to initialize mysqli->prepare().";
			$msg_db_fail = "DB table update unsuccessful: ";
			$msg_db_success = "DB table update successful: ";
			$stmt = $this->mysqli->prepare("UPDATE client SET client_name = ?,
				client_description = ?,
				last_edited_date = ?,
				last_edited_by = ?
				WHERE client_id = ?");
			if ($stmt) {
				$stmt->bind_param("ssssi", $name, $desc, $date, $by, $id);
				$name = $request->name;
				$desc = $request->description;
				$date = $request->last_edited_date;
				$by = $request->last_edited_by;
				$id = $request->id;
				if ($stmt->execute()) echo $msg_db_success . "client (id: ".$id." ). ";
				else echo $msg_db_fail . "client. ";
				$this->mysqli->commit();
				$stmt->close();
			} else echo $msg_mysqli_fail;
			$i = count($request->sites);
			if ($i) {
				$stmt = $this->mysqli->prepare("UPDATE website SET website_name = ?,
					website_url = ?
					WHERE website_id = ?");
			} else $stmt = null;
			if ($stmt) {
				while ($i--) {
					$site = $request->sites["".$i.""];
					$stmt->bind_param("ssi", $name, $url, $id);
					$name = $site->name;
					$url = $site->url;
					$id = $site->id;
					if ($stmt->execute()) echo $msg_db_success . "website (id: ".$id." ). ";
					else echo $msg_db_fail . "website. ";
					$this->mysqli->commit();
					$login = $site->logins;
					$j = count($login->types);
					if ($j) {
						$stmt = $this->mysqli->prepare("UPDATE login SET login_type = ?,
							login_connection = ?,
							login_username = ?,
							login_password = ?
							WHERE login_id = ?");
					} else $stmt = null;
					if ($stmt) {
						$stmt->bind_param("ssssi", $type, $connection, $username, $password, $id);
						while ($j--) {
							$type = $login->types[$j];
							$connection = $login->connections[$j];
							$username = $login->usernames[$j];
							$password = $login->passwords[$j];
							$id = $login->ids[$j];
							if ($stmt->execute()) echo $msg_db_success . "login (id: ".$id." ). ";
							else echo $msg_db_fail . "login. ";
						}
					} else echo $msg_mysqli_fail;
				}
			} else echo $msg_mysqli_fail;
			$stmt->close();
		}
	}

	$api = new API;
	$api->init();

?>
