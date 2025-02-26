<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function storeUser(StoreUserRequest $request)
    {
        $validatedData = $request->validated();

        if ($validatedData) {

            User::create($validatedData);

            return response()->json([

                'message' => 'Account created successfully'

            ]);
        }
    }

    /**
     * Auth the requested user for login session
     */
    public function authUser(AuthUserRequest $request)
    {
        $validatedData = $request->validated();

        if ($validatedData) {

            $user = User::whereEmail($request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {

                return response()->json([

                    'error' => 'The credentials provided do not match our records',
                ]);
            } else {

                return response()->json([

                    'user' => UserResource::make($user),
                    'accessToken' => $user->createToken('logged_in')->plainTextToken

                ]);
            }
        }
    }

    /**
     * Logout an authenticated user
     */
    public function loggedOut(Request $request)
    {

        $request->user()->currentAccessToken()->delete();

        return response()->json([

            'message' => 'Logged out successfully'

        ]);
    }
    /**
     * Update authenticated user info
     */
    public function updateUserInfo(Request $request)
    {

        $user = Auth::user();

        $request->validate([

            'profile_image' => 'image|mimes:png,jpg,jpeg|max:4028'

        ]);


        if ($request->has('profile_image')) {

            if (File::exists(asset($request->user()->image))) {

                File::delete(asset($request->user()->image));
            }

            $file = $request->file('profile_image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('images/users/', $imageName, 'public');

            $request->user()->update(['image' => 'storage/images/users/' . $imageName]);

            return response()->json([

                'message' => 'Profile image updated successfully',

                'user' => UserResource::make($request->user())

            ]);
        } else {

            $request->user()->update([

                'country' => $request->country,
                'city' => $request->city,
                'address' => $request->address,
                'zip_code' => $request->zip_code,
                'phone' => $request->phone,
                'profile_completed' => 1,

            ]);

            return response()->json([

                'message' => 'Profile updated successfully',

                'user' => UserResource::make($request->user())

            ]);
        }
    }
}
