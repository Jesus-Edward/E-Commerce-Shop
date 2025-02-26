<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get all the users
     */

    public function index()
    {
        $users = User::latest()->get();
        return view('admin.users.index', compact('users'));
    }

    /**
     * Delete users
     */

    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return to_route('admin.users.index')->with(['message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            logger($e);
        }
    }
}
