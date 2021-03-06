<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UserModel;
use \Firebase\JWT\JWT;
use CodeIgniter\API\ResponseTrait;

class AuthController extends BaseController
{
    use ResponseTrait;
    private $userModel;

    public function __construct(){
        $this->userModel = new UserModel();
    }

    public function signin()
    {
        try{
            $this->validation->setRules([
    			"email" => "required|valid_email",
			    "password"	=> "required|min_length[8]",
		    ]);

		    $this->validation->withRequest($this->request)->run();

		    if(count($this->validation->getErrors())){
    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }

            $email = $this->request->getVar("email");
            $password = $this->request->getVar("password");

            $user = $this->userModel->where("email",$email)->first();

            if(!$user){
                return $this->respond([
                    "message" => "Email tidak ditemukan"
                ],422);
            }

            $pwd_verify = password_verify($password, $user['password']);
  
            if(!$pwd_verify) {
                return $this->respond([
                    'message' => 'Invalid username or password.'
                ], 422);
            }
             
            $token = JWT::encode([
                "sub" => $user["id"],
                "iat" => time(),
                "exp" => time() + 3600
            ],getenv('JWT_SECRET'),"HS256");
            
            return $this->respond([
                "user" => $user,
                "token" => $token
            ]);    
        }catch(\Exception $e){
            log_message('error', $e->getMessage());

            return $this->respond([
                "message" => "Terjadi Kesalahan"
            ],500);
        }
    }

    public function signup(){
        try{
            $this->db->transStart();

            $this->validation->setRules([
                "name" => "required",
                "email" => "required|valid_email|is_unique[users.email]",            
			    "password"	=> "required|min_length[8]",
		    ]);

		    $this->validation->withRequest($this->request)->run();

		    if(count($this->validation->getErrors())){
                $this->db->transRollback();

    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }

            $name = $this->request->getVar("name");
            $email = $this->request->getVar("email");
            $password = $this->request->getVar("password");

            $this->userModel->insert([
                "name" => $name,
                "email" => $email,
                "password" => password_hash($password,PASSWORD_DEFAULT)
            ]);

            $this->db->transComplete();

            return $this->respond([
                "message" => "Berhasil"
            ]);
        }catch(\Exception $e){
            $this->db->transRollback();

            log_message('error', $e->getMessage());

            return $this->respond([
                "message" => "Terjadi Kesalahan"
            ],500);
        }
    }

    public function logout(){
        return $this->respond([
            "message" => "Success"
        ]);
    }

    public function me(){
        return $this->respond([
            "user" => $this->userModel->where("id",$this->request->jwt->sub)->first(),
        ]);
    }

    public function forgotPassword(){
        try{
            $this->db->transStart();

            $this->validation->setRules([
                "email" => "required|valid_email",            
		    ]);

		    $this->validation->withRequest($this->request)->run();

		    if(count($this->validation->getErrors())){
                $this->db->transRollback();

    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }

            $user = $this->userModel->where("email",$this->request->getVar("email"))->first();

            if(!$user){
                $this->db->transRollback();

                return $this->respond([
                    "message" => "Email tidak ditemukan"
                ],422);
            }

            $this->userModel->update($user["id"],[
                "remember_token" => "12345"
            ]);

            $this->db->transComplete();

            return $this->respond([
                "message" => "Berhasil"
            ]);
        }catch(\Exception $e){
            $this->db->transRollback();

            log_message('error', $e->getMessage());

            return $this->respond([
                "message" => "Terjadi Kesalahan"
            ],500);
        }
    }

    public function resetPassword(){
        try{
            $this->db->transStart();

            $this->validation->setRules([
                "email" => "required|valid_email",            
                "token" => "required",
                "password" => "required|min_length[8]",
                "password_confirmation" => "required|min_length[8]"
		    ]);

		    $this->validation->withRequest($this->request)->run();

		    if(count($this->validation->getErrors())){
                $this->db->transRollback();

    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }
            
            $email = $this->request->getVar("email");
            $token = $this->request->getVar("token");
            $password = $this->request->getVar("password");
            $password_confirmation = $this->request->getVar("password_confirmation");

            if($password != $password_confirmation){
                $this->db->transRollback();

                return $this->respond([
                    "message" => "Password konfirmasi harus sama"
                ],422);
            }

            $user = $this->userModel->where("email",$email)
                ->where("remember_token",$token)
                ->first();

            if(!$user){
                $this->db->transRollback();

                return $this->respond([
                    "message" => "Email tidak ditemukan"
                ],422);
            }
    
            $this->userModel->update($user["id"],[
                "password" => password_hash($password,PASSWORD_DEFAULT)
            ]);

            $this->db->transComplete();

            return $this->respond([
                "message" => "Berhasil"
            ]);
        }catch(\Exception $e){
            $this->db->transRollback();

            log_message('error', $e->getMessage());

            return $this->respond([
                "message" => "Terjadi Kesalahan"
            ],500);
        }
    }
}
