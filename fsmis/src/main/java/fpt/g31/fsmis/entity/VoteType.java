package fpt.g31.fsmis.entity;

public enum VoteType {
    UPVOTE(1), DOWNVOTE(-1);

    private int direction;

    VoteType(int direction) {
    }

    public Integer getDirection() {
        return direction;
    }
}
