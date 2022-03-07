<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\ProductModel;
use CodeIgniter\API\ResponseTrait;

class ProductController extends BaseController
{
    use ResponseTrait;
    private $productModel;

    public function __construct(){        
        $this->productModel = new ProductModel();
    }

    public function index(){
        $data = $this->productModel;

		if(!empty($this->request->getVar('search'))){
			$search = \Config\Database::connect()->escapeString(trim(htmlspecialchars($this->request->getVar('search'))));
			$data = $data->orWhere('title',$search);
		}

		return $this->respond([
        	"product" => $data
        		->orderBy('id' ?? $this->request->getVar("column"),$this->request->getVar("order") ?? 'desc')
        		->paginate($this->request->getVar("per_page") ?? 10),
            "pager" => $this->productModel->pager->getDetails(),    
        ]);
    }

    public function show($id){
        if(intval($id) <= 0){
            return $this->respond([
                "message" => "Not Found"
            ],404);
        }

        return $this->respond($this->productModel->where("id",$id)->first());        
    }

    public function store(){
        try{            
            $this->db->transStart();       
            
            $this->validation->setRules([            
                "name" => "required",
                "stock" => "required|decimal|greater_than_equal_to[0.00]|regex_match[/^-?[0-9]+(?:.[0-9]{1,2})?$/]",
                "price" => "required|decimal|greater_than_equal_to[0.00]|regex_match[/^-?[0-9]+(?:.[0-9]{1,2})?$/]"			   ,
		    ]);

		    $this->validation->withRequest($this->request)->run();

		    if(count($this->validation->getErrors())){
                $this->db->transRollback();

    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }

            $this->productModel->insert([
                "name" => $this->request->getVar("name"),
                "stock" => $this->request->getVar("stock"),
                "price" => $this->request->getVar("price"),
                "description" => $this->request->getVar("description")
            ]);

            $this->db->transComplete();

            return $this->respond([
                "message" => "Success"
            ]);
        }catch(\Exception $e){
            $this->db->transRollback();

            log_message('error', $e->getMessage());

            return $this->respond([
                "message" => "Terjadi Kesalahan"
            ],500);
        }
    }

    public function update($id){
        try{
            $this->db->transStart();

            if(intval($id) <= 0){
                $this->db->transRollback();

                return $this->respond([
                    "message" => "Not Found"
                ],404);
            }

            $this->validation->setRules([            
                "name" => "required",
                "stock" => "required|decimal|greater_than_equal_to[0.00]|regex_match[/^-?[0-9]+(?:.[0-9]{1,2})?$/]",
                "price" => "required|decimal|greater_than_equal_to[0.00]|regex_match[/^-?[0-9]+(?:.[0-9]{1,2})?$/]",
		    ]);

		    $this->validation->withRequest($this->request)->run();

		    if(count($this->validation->getErrors())){
                $this->db->transRollback();

    			return $this->respond([
				    "message" => $this->validation->getErrors()[array_keys($this->validation->getErrors())[0]]
			    ],422);
		    }

            $product = $this->productModel->where("id",$id)->first();

            if(!$product){
                $this->db->transRollback();

                return $this->respond([
                    "message" => "Not Found"
                ],404);
            }

            $this->productModel->update($product["id"],[
                "name" => $this->request->getVar("name"),
                "stock" => $this->request->getVar("stock"),
                "price" => $this->request->getVar("price"),
                "description" => $this->request->getVar("description")
            ]);

            $this->db->transComplete();

            return $this->respond([
                "message" => "Success"
            ]);
        }catch(\Exception $e){
            $this->db->transRollback();

            log_message('error', $e->getMessage());

            return $this->respond([
                "message" => "Terjadi Kesalahan"
            ],500);
        }
    }

    public function destroy($id){
        try{
            $this->db->transStart();

            if(intval($id) <= 0){
                $this->db->transRollback();

                return $this->respond([
                    "message" => "Not Found"
                ],404);
            }

            $this->productModel->delete($id);

            $this->db->transComplete();

            return $this->respond([
                "message" => "Success"
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
