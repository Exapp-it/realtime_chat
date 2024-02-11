<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageSentEvent;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\MessageRequest;

class ChatController extends Controller
{
  public function index()
  {
    $messages = Message::query()->with('user')->get();
    return [
      'messages' => $messages,
    ];
  }

  public function send(MessageRequest $request)
  {
    $message = $request->user()
      ->messages()
      ->create($request->validated());


    broadcast(new MessageSentEvent($request->user(), $message));

    return $message;
  }

}
