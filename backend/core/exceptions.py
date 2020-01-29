class RoomIntegerException(Exception):
    """
    The integral part of a room number is invalid.
    """
    pass

class RoomSuffixException(Exception):
    """
    The alphabetic part of a room number is invalid.
    """
    pass

class UserNotFoundException(Exception):
    """
    The supplied username does not exist.
    """

class RoomNotFoundException(Exception):
    """
    The supplied room number does not exist.
    """

class InvalidUserCSVException(Exception):
    """
    The given User CSV contains errors.
    """
    def __init__(self, message, errors):
        super(Exception, self).__init__(message)
        self.errors = errors