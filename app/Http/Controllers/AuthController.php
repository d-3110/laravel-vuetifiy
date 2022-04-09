<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request) :JsonResponse
    {
        $credentials = $request->all();
        if (Auth::attempt($credentials)) {
            return response()->json(['user' => Auth::user()], 200);
        }

        return response()->json(['message' => 'メールアドレスまたはパスワードが正しくありません。'], 422);
    }

    public function logout() :JsonResponse
    {
        Auth::logout();
        return response()->json(['message' => 'ログアウトしました。'], 200);
    }
}