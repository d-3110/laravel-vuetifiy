<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\JsonResponse;

/**
 * ログイン時のリクエスト
 */
class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * @return bool
     */
    public function authorize() :bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() :Array
    {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }

    /**
     * OrverRide バリデーション失敗時
     *
     * @return JsonResponse
     */
    protected function failedValidation(Validator $validator) :JsonResponse
    {
        // どのエラーでも同じエラー文言を返す
        return response()->json(['message' => 'メールアドレスまたはパスワードが正しくありません。'], 422);
    }

}
