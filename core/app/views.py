from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from django.contrib.auth.models import User

def Home(request): 
    return render(request, "uifiles/index.html")


def About(request): 
    return render(request, "uifiles/about.html")


def Login(request): 
    x= 10
    return render(request, "uifiles/login.html")

@csrf_exempt
def Register(request): 
    if request.method == "POST":

        username = request.POST.get("username")
        fullname = request.POST.get("full_name")
        email = request.POST.get("email")
        password = request.POST.get("password")

      

        # Create user
        user = User.objects.create(
            username=username,
            first_name=fullname,
            email=email,
            password=password
        )

    return render(request, "uifiles/register.html")

def Login(request): 
    return render(request, "uifiles/login.html")
