<?php

namespace App\Http\Controllers\Admin;

use App\Media;
use App\Utility;
use App\Comparison;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ComparisonController extends Controller
{
    public function get() {
        $comparisons = Comparison::with('before', 'after')->get();
        $comparisons = $comparisons->transform(function($item, $key) {
            $img = $item->before->thumb;
            $item->before->thumb = Storage::disk('local')->url($img);
            $img = $item->after->thumb;
            $item->after->thumb = Storage::disk('local')->url($img);
            return $item;
        });
        return $comparisons;
    }

    public function create(Request $request) {
        $media_left = $request->media_left;
        $media_right = $request->media_right;

        $left = Utility::saveImg($media_left);
        $right = Utility::saveImg($media_right);

        $comparison = new Comparison();
        $comparison->category_id = $request->category_id;
        $comparison->left_id = $left->id;
        $comparison->right_id = $right->id;
        $comparison->save();

        return [
            'status' => true,
            'comparison' => $comparison
        ];
    }

    public function update() {}

    public function destroy($id) {
        $comparison = Comparison::find($id);
        $comparison->delete();

        return [
            'status' => true,
            'id' => $id,
        ];
    }
}
