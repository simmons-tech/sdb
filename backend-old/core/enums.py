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
