<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index() {
        $odontoiatria = Service::where('category_id', 1)->get();
        $estetica = Service::where('category_id', 2)->get();

        return view('welcome', compact('odontoiatria', 'estetica'));
    }
}
