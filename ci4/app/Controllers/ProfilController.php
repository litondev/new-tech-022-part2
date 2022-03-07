<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class ProfilController extends BaseController
{
    use ResponseTrait;
    private $userModel;

    public function __construct(){
        $this->userModel = new UserModel();
    }

    public function data()
    {
        try{
            $this->db->transStart();

            $this->validation->setRules([
                "name" => "required",
    			"email" => "required|valid_email",
			    "password"	=> "required|min_length[8]",
		    ]);

		    $this->validation->withRequest($this->request)->run();

		    if(count($this->validation->getErrors())){
                $this->db->transRollback();

    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }

            $user = $this->userModel->where("id",$this->request->jwt->sub)->first();

            $pwd_verify = password_verify($this->request->getVar("password"), $user['password']);
  
            if(!$pwd_verify) {
                $this->db->transRollback();

                return $this->respond([
                    'message' => 'Invalid username or password.'
                ], 422);
            }

            $this->userModel->update($user["id"],[
                "name" => $this->request->getVar("name"),
                "email" => $this->request->getVar("email")
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

    public function password(){
        try{
            $this->db->transStart();

            $this->validation->setRules([            
                "password" => "required|min_length[8]",
			    "old_password"	=> "required|min_length[8]",
		    ]);

		    $this->validation->withRequest($this->request)->run();

		    if(count($this->validation->getErrors())){
                $this->db->transRollback();

    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }

            $user = $this->userModel->where("id",$this->request->jwt->sub)->first();

            $pwd_verify = password_verify($this->request->getVar("password"), $user['password']);
  
            if(!$pwd_verify) {
                $this->db->transRollback();

                return $this->respond([
                    'message' => 'Invalid username or password.'
                ], 422);
            }

            $this->userModel->update($user["id"],[
                "password" => password_hash($this->request->getVar("password"),PASSWORD_DEFAULT)
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

    public function photo()
    {
        try{
            $this->db->transStart();

            $this->validation->setRules([
    			"photo" => "uploaded[photo]|max_size[photo,10024]|mime_in[photo,image/jpg,image/jpeg,image/png]|max_dims[photo,5000,5000]"
		    ]);

		    $this->validation->withRequest($this->request)->run();

            if(count($this->validation->getErrors())){
                $this->db->transRollback();

    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }

		    $photo = $this->request->getFile('photo');

	        $name = $photo->getRandomName();	  

		    $image = \Config\Services::image();

  		    $image->withFile($photo->getTempName())  		   
            	->fit(500, 500, 'center')
        	    ->save('./images/users/'.$name);

  			$payload = [
      			"photo" => $name
  			];
  		
            $user = $this->userModel->where("id",$this->request->jwt->sub)->first();

  			$this->userModel->update($user["id"],$payload);

      	    if($user['photo'] != 'default.png'){						 
  			    $filePath = "./images/users/".$user['photo'];

				if(file_exists($filePath)){
    				unlink($filePath);
				}						
  			}				

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
