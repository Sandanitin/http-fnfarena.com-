<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\MenuDocumentModel;
use App\Libraries\R2Upload;

class MenuDocumentController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new MenuDocumentModel();
    }

    // GET all menu documents
    public function index()
    {
        $data = $this->model->getAll();

        return $this->respond([
            'status'  => 200,
            'message' => 'Menu documents fetched successfully',
            'data'    => $data
        ]);
    }

    // POST update (form-data)
    public function update($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) return $this->failNotFound('Menu document not found');

        $auditId = $this->request->getPost('update_audit_id');
        if (!$auditId) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $r2 = new R2Upload();

        // Default existing values
        $gamingMenu  = $record['gaming_menu'];
        $overallMenu = $record['overall_menu'];
        $cafeMenu    = $record['cafe_menu'];

        // gaming_menu upload
        $gamingFile = $this->request->getFile('gaming_menu');
        if ($gamingFile && $gamingFile->isValid() && !$gamingFile->hasMoved()) {
            $fileName = uniqid() . '.' . $gamingFile->getExtension();
            $r2->upload($gamingFile->getTempName(), 'FNF/' . $fileName);
            $gamingMenu = $fileName;
        }

        // overall_menu upload
        $overallFile = $this->request->getFile('overall_menu');
        if ($overallFile && $overallFile->isValid() && !$overallFile->hasMoved()) {
            $fileName = uniqid() . '.' . $overallFile->getExtension();
            $r2->upload($overallFile->getTempName(), 'FNF/' . $fileName);
            $overallMenu = $fileName;
        }

        // cafe_menu upload
        $cafeFile = $this->request->getFile('cafe_menu');
        if ($cafeFile && $cafeFile->isValid() && !$cafeFile->hasMoved()) {
            $fileName = uniqid() . '.' . $cafeFile->getExtension();
            $r2->upload($cafeFile->getTempName(), 'FNF/' . $fileName);
            $cafeMenu = $fileName;
        }

        $updateData = [
            'gaming_menu'     => $gamingMenu,
            'overall_menu'    => $overallMenu,
            'cafe_menu'       => $cafeMenu,
            'update_audit_id' => $auditId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Menu documents updated successfully',
            'data'    => $updateData
        ]);
    }
}