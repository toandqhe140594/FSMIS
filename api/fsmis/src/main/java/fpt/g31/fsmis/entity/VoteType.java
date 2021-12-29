package fpt.g31.fsmis.entity;

public enum VoteType {
    DOWNVOTE(0), UPVOTE(1);

    private int direction;

    VoteType(int direction) {
    }

    public Integer getDirection() {
        return direction;
    }
}
