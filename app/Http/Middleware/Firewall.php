<?php

namespace App\Http\Middleware;

use App;
use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\IpUtils;

class Firewall
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $request->setTrustedProxies(
            [$request->server->get('REMOTE_ADDR')],
            Request::HEADER_X_FORWARDED_ALL
        );
        if (App::isLocal() || $this->isAllowedIp($request->ip())) {
            return $next($request);
        }

        throw new AuthorizationException(sprintf('Access denied from %s', $request->ip()));
    }

    /**
     * @param string $ip
     * @return bool
     */
    private function isAllowedIp(string $ip): bool
    {
        return IpUtils::checkIp($ip, explode(',', env('ALLOWED_ADMIN_IPS')));
    }
}
