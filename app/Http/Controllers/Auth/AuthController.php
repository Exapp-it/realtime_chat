<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{

  public function login(Request $request)
  {
    $request->validate([
      'login' => ['required', 'string'],
      'password' => ['required', 'string'],
    ]);

    $credentials = $request->only(['login', 'password']);

    if (!$token = auth()->attempt($credentials)) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    return $this->respondWithToken($token, auth()->user());
  }



  public function me()
  {
    return response()->json(auth()->user());
  }


  public function logout()
  {
    auth()->logout();

    return response()->json(['message' => 'Successfully logged out']);
  }


  public function refresh()
  {
    return $this->respondWithToken(auth()->refresh());
  }

  protected function respondWithToken($token, $user = null)
  {
    return response()->json([
      'user' => $user->id,
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60
    ]);
  }
}
