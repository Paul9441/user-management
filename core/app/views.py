from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

def Home(request): 
    return render(request, "uifiles/index.html")


def About(request): 
    return render(request, "uifiles/about.html")

def Login(request):

    if request.method == "POST":

        username = request.POST.get("username")
        password = request.POST.get("password")

        if not username or not password:
            return JsonResponse({
                "success": False,
                "message": "Please enter username and password."
            }, status=400)

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:

            login(request, user)

            return JsonResponse({
                "success": True,
                "message": "Login successful."
            })

        else:

            return JsonResponse({
                "success": False,
                "message": "Invalid username or password."
            }, status=401)

    return render(request, "uifiles/login.html")

@csrf_exempt
def Register(request): 
    if request.method == "POST":
        username = request.POST.get("username")
        fullname = request.POST.get("full_name")
        email = request.POST.get("email")
        password = request.POST.get("password")

        # Check required fields
        if not username or not fullname or not email or not password:
            return JsonResponse({
                "success": False,
                "message": "All fields are required"
            }, status=400)

        # Check username already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                "success": False,
                "message": "Username already exists"
            }, status=400)

        # Check email already exists
        if User.objects.filter(email=email).exists():
            return JsonResponse({
                "success": False,
                "message": "Email already registered"
            }, status=400)

        try:
            user = User.objects.create_user(
                username=username,
                first_name=fullname,
                email=email,
                password=password
            )

            return JsonResponse({
                "success": True,
                "message": "User registered successfully"
            }, status=201)

        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "Unable to register user"
            }, status=500)


    return render(request, "uifiles/register.html")

