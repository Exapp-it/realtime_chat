<?php

namespace App\Broadcasting;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ChatChannel
{
  /**
   * Create a new channel instance.
   */
  public function __construct()
  {
    //
  }

  /**
   * Authenticate the user's access to the channel.
   */
  public function join(User $user): array|bool
  {
    if (Auth::check()) {
      return ['id' => $user->id, 'login' => $user->login];
    }
    return false;
  }
}
