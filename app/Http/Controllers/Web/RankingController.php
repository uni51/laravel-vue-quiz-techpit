<?php

namespace App\Http\Controllers\Web;

use App\Ranking;
use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RankingController extends Controller
{
    protected $ranking;

    /**
     * RankingController constructor.
     * @param Ranking $ranking
     * @return void
     */
    public function __construct(Ranking $ranking)
    {
        $this->ranking = $ranking;
    }

    /**
     * クイズ終了ボタンクリック時アクション
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function insertRanking(Request $request)
    {
        if (Auth::check()) {
            // ユーザーがログイン中であればスコアをInsert
            $correctRatio = $request->input('correctRatio');
            $this->ranking->insertScore((int) $correctRatio, Auth::user()->id);
        }
        return redirect('/');
    }
}
