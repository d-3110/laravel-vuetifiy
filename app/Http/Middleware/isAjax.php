<?php

namespace App\Http\Middleware;

use Closure;

class isAjax
{
    /**
     * ajaxでない場合404
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        abort_unless($request->ajax(), 404);
        return $next($request);
    }
}
