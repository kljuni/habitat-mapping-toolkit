from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
      if password is None:
          raise TypeError('Superusers must have a password.')

      user = self.create_user(username, email, password)
      user.is_superuser = True
      user.is_staff = True
      user.save()

      return user

class User(AbstractUser):
    email = models.EmailField(unique=True)
    # Used for identifying staff accounts, defaults to false
    is_staff = models.BooleanField(default=False)

    # The `USERNAME_FIELD` property tells us which field we will use to log in.
    # In this case, we want that to be the email field.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        return self.email