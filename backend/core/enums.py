from enumchoicefield import ChoiceEnum


class ResidentType(ChoiceEnum):
    AHOH = "Associate Head of House"
    GRA = "GRA"
    HOH = "Head of House"
    MGR = "House Manager"
    OTHER = "Other"
    RLA = "RLA"
    TEMP = "Temp"
    U = "Undergraduate"
    VS = "Visiting Scholar"


class DeskItemType(ChoiceEnum):
    MOVIE = "Movie"
    XBOX = "XBox Games"
    TV_SERIES = "TV Series"
    BLURAY = "Blu Ray"
    PS3_GAME = "PS3 Game"
    WII_GAME = "Wii Game"
    SWITCH_GAME = "Switch Game"
    CONSOLE = "Console"
    OTHER = "Other"

    @classmethod
    def get(cls, choice):
        """
        Takes an integer input and returns the Enum choice that corresponds to the given integer

        :param choice: int value of the choice you would like, identified by `list(DeskItemType)`
        :return: DeskItemType value
        """

        values = {
            1: DeskItemType.MOVIE,
            2: DeskItemType.XBOX,
            3: DeskItemType.TV_SERIES,
            4: DeskItemType.BLURAY,
            5: DeskItemType.PS3_GAME,
            6: DeskItemType.WII_GAME,
            7: DeskItemType.SWITCH_GAME,
            8: DeskItemType.CONSOLE,
            9: DeskItemType.OTHER,
        }

        return values[choice]
