from django.shortcuts import render

# Create your views here.
def Home(request): 
    return render(request, "uifiles/index.html")


def About(request): 
    return render(request, "uifiles/about.html")


def Login(request): 
    return render(request, "uifiles/login.html")

def Register(request): 
    return render(request, "uifiles/register.html")

def Login(request): 
    return render(request, "uifiles/login.html")
