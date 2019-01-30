<?php

namespace App;


use App\Media;
use Intervention\Image\Facades\Image;
use Illuminate\Database\Eloquent\Model;

class Utility extends Model
{
    public static function saveImg($media) {

        $det = [
                    'name'  => $media->getClientOriginalName(),
                    'noext' => preg_replace('/\\.[^.\\s]{3,4}$/', '', $media->getClientOriginalName()),
                    'ext'   => $media->getClientOriginalExtension(),
                    'size'  => $media->getSize(),
                    'mime'  => $media->getMimeType(),
                    'path'  => $media->getRealPath(),
                ];

        // Allowed File Extensions
        $video = ['mp4', 'avi','mov','mpeg','3gp','m4v','mkv','flv','FLV','MP4','MKV','MOV','AVI','MPEG','MPEG'];
        $audio = ['wav','mp3','WAV','MP3'];
        $image = ['jpg','png','gif','JPG','PNG','GIF'];

        // Define what type of file it is
        $ext = $det['ext'];

        $file = $media->storeAs('public/media', $det['name']);

        // preparo gli altri formati
        $thumb = $media->storeAs('public/media', 'thumb_'.$det['name']);
        $medium = $media->storeAs('public/media', 'md_'.$det['name']);
        $high = $media->storeAs('public/media', 'lg_'.$det['name']);
        $slide_img = $media->storeAs('public/media', $det['name']);

        // genero gli altri formati
        $path = storage_path('app/public/media');

        // Thumb
        Image::make($path.'/thumb_'.$det['name'])->fit(256, 256, function ($constraint) {
            $constraint->upsize();
        })->save();

        Image::make($path.'/md_'.$det['name'])->fit(512, 512, function ($constraint) {
            $constraint->upsize();
        })->save();

        Image::make($path.'/lg_'.$det['name'])->fit(1024, 1024, function ($constraint) {
            $constraint->upsize();
        })->save();

        // Verifico che l'immagine non sia già presente
        $img = Media::where('src', '=', $file)->first();

        // Se il record non esiste ne creo uno nuovo
        if ($img === null) {
            $img = new Media;
            $img->src = $file;
            $img->thumb = $thumb;
            $img->medium = $medium;
            $img->high = $high;
            $img->save();
        }

        return $img;
    }

}
