from django.contrib.auth.management.commands.createsuperuser import \
    Command as BaseCommand
from django.core.management import CommandError


class Command(BaseCommand):
    help = "Cria um superusuário com senha e idade"

    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument("--password", type=str,
                            help="Senha do superusuário")
        parser.add_argument("--idade", type=int, help="Idade do superusuário")

    def handle(self, *args, **options):
        password = options.get("password")
        idade = options.get("idade")

        if password is None:
            raise CommandError(
                "Você precisa fornecer uma senha usando --password")

        user = self.UserModel._default_manager.create_superuser(
            username=options["username"],
            email=options["email"],
            password=password,
            idade=idade,
        )
        self.stdout.write(self.style.SUCCESS(
            f"Superusuário {user.username} criado com sucesso!"))
