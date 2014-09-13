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

	class REST {
		
		public $_allow = array();
		public $_content_type = "application/json";
		public $_request = array();
		
		private $_method = "";		
		private $_code = 200;
		
		public function __construct() { $this->inputs(); }
		
		public function get_referer() { return $_SERVER["HTTP_REFERER"]; }
		
		public function response($data,$status) {
			$this->_code = ($status)?$status:200;
			$this->set_headers();
			echo $data;
			exit;
		}

		private function get_status_message() {
			$status = array(
						200 => "OK",
						201 => "Created",  
						204 => "No Content",  
						404 => "Not Found",  
						406 => "Not Acceptable");
			return ($status[$this->_code])?$status[$this->_code]:$status[500];
		}
		
		public function get_request_method() {
			return $_SERVER["REQUEST_METHOD"];
		}

		public function check_request_method() {
			if($this->get_request_method() != "GET") $this->response("",406);
		}
		
		private function inputs() {
			switch($this->get_request_method()) {
				case "POST":
					$this->_request = $this->cleanInputs($_POST);
					break;
				case "GET":
				case "DELETE":
					$this->_request = $this->cleanInputs($_GET);
					break;
				case "PUT":
					parse_str(file_get_contents("php://input"),$this->_request);
					$this->_request = $this->cleanInputs($this->_request);
					break;
				default:
					$this->response("",406);
					break;
			}
		}		
		
		private function cleanInputs($data) {
			$clean_input = array();
			if(is_array($data)) {
				foreach($data as $k => $v) $clean_input[$k] = $this->cleanInputs($v);
			}else{
				if(get_magic_quotes_gpc()) $data = trim(stripslashes($data));
				$data = strip_tags($data);
				$clean_input = trim($data);
			}
			return $clean_input;
		}		
		
		private function set_headers() {
			header("HTTP/1.1 ".$this->_code." ".$this->get_status_message());
			header("Content-Type:".$this->_content_type);
		}
	}	
?>