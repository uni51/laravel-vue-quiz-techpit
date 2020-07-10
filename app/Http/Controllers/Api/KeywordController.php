<?php

namespace App\Http\Controllers\Api;

use App\Keyword;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KeywordController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index(Request $request)
    {
        $initial = $request->input('initial');
        $keyword = Keyword::with('category')
            ->where('keywords.initial', '=',  $initial)
            ->orderby('keywords.keyword')
            ->get();

        return $keyword;
    }
}
