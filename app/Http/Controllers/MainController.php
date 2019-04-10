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
    public function index($slug = '/') {
        $odontoiatria = Service::where('category_id', 1)->get();
        $estetica = Service::where('category_id', 2)->get();

        $comparisons = Comparison::with('before', 'after')->get();
        $comparisons = $comparisons->transform(function($item, $key) {
            $img = $item->before->src;
            $item->before->thumb = Storage::disk('local')->url($img);
            $img = $item->after->src;
            $item->after->thumb = Storage::disk('local')->url($img);
            return $item;
        });

        $services = Service::all();
        $chunks = array_filter(explode('/', $slug));

        $meta = [
            'title' => null,
            'description' => null,
        ];

        if (count($chunks) > 0) {
            foreach ($chunks as $key => $chunk) {
                $results = $services->filter(function($service, $key) use ($chunk) {
                    return $service->slug == $chunk;
                });

                if (count($results) > 0) {
                    $result = $results->first();
                    $meta['title'] = $result->seo_title;
                    $meta['description'] = $result->seo_description;
                }
            }
        }

        return view('welcome', compact('odontoiatria', 'estetica', 'comparisons', 'meta'));
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
