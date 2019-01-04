<?php

namespace App\Http\Controllers\Admin;

use App\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ServicesController extends Controller
{
    public function get($category) {
        if ($category == 'estetica') {
            $services = Service::where('category_id', 2)->get();
        } else {
            $services = Service::where('category_id', 1)->get();
        }
        return $services;
    }

    public function create(Request $r) {
        $service = new Service();
        $service->category_id = $r->category;
        $service->title = $r->title;
        $service->description = $r->description;
        $service->save();

        return [
            'status' => true,
            'service' => $service,
        ];
    }

    public function update(Request $r) {
        $service = Service::where('id', $r->id)->first();
        if ($service) {
            $service->title = $r->title;
            $service->description = $r->description;
            $service->save();

            return [
                'status' => true,
                'service' => $service,
            ];
        }

        return [
            'status' => false,
            'error' => 'non trovato'
        ];
    }

    public function destroy($id) {
        $service = Service::find($id);
        $service->delete();

        return [
            'status' => true,
            'id' => $id,
        ];
    }
}
