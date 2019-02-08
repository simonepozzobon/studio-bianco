<?php

namespace App\Http\Controllers;

use App\Cookie;
use App\Service;
use App\Comparison;
use App\Mail\ClientMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class MainController extends Controller
{
    public function index() {
        $odontoiatria = Service::where('category_id', 1)->get();
        $estetica = Service::where('category_id', 2)->get();

        $comparisons = Comparison::with('before', 'after')->get();
        $comparisons = $comparisons->transform(function($item, $key) {
            $img = $item->before->thumb;
            $item->before->thumb = Storage::disk('local')->url($img);
            $img = $item->after->thumb;
            $item->after->thumb = Storage::disk('local')->url($img);
            return $item;
        });

        return view('welcome', compact('odontoiatria', 'estetica', 'comparisons'));
    }

    public function cookies_preferences(Request $request) {
        $ip = \Request::ip();

        $cookie = new Cookie();
        $cookie->ip = $ip ? $ip : 'no-ip';
        $cookie->accepted = 1;
        $cookie->save();

        return [
            'ip' => $ip,
        ];
    }

    public function send_message(Request $request) {

        Mail::to(env('ADMIN_EMAIL'))->send(new ClientMessage($request->email, $request->message));

        return [
            'success' => true
        ];
    }
}
