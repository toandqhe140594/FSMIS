package fpt.g31.fsmis.service;

import fpt.g31.fsmis.repository.FishingMethodRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FishingMethodService {

    private final FishingMethodRepos fishingMethodRepos;

    public Object getAll() {
        return fishingMethodRepos.findAll();
    }
}
